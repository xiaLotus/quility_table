from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os
from datetime import datetime
import uuid
import shutil


app = Flask(__name__)
CORS(app)

# 檔案路徑
RECORD_FILE = "data/records.csv"
PROGRESS_FILE = "data/progress_log.csv"

RECORD_FILE_FIELD_ORDER = [
    "id", "keyinDay", "data", "description", "lc", "quantity",
    "batchNumber", "yield", "currentSite", "client", "status", "closeDay"
]

# 確保資料夾存在
os.makedirs("data", exist_ok=True)

@app.route('/get_records', methods=['GET'])
def get_records():
    try:
        records = []
        with open(RECORD_FILE, encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if '\ufeffid' in row:
                    row['id'] = row.pop('\ufeffid')
                row['progressLog'] = []
                records.append(row)

        if os.path.exists(PROGRESS_FILE):
            with open(PROGRESS_FILE, encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for log in reader:
                    for record in records:
                        if record['id'] == log['record_id']:
                            record['progressLog'].append({
                                "time": log['time'],
                                "text": log['text']
                            })

        return jsonify(status='success', data=records)

    except Exception as e:
        return jsonify(status='error', error=str(e))





@app.route("/add_record", methods=["POST"])
def add_record():
    try:
        record = request.get_json(force=True)
        if not isinstance(record, dict) or not record:
            return jsonify({"status": "error", "message": "Invalid record"}), 400
        
        record["id"] = uuid.uuid4().hex
        write_header = not os.path.exists(RECORD_FILE)
        with open(RECORD_FILE, "a", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(f, fieldnames=RECORD_FILE_FIELD_ORDER)
            if write_header:
                writer.writeheader()
            writer.writerow(record)

        return jsonify({"status": "success", "message": "Record added"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400



@app.route("/update_record", methods=["POST"])
def update_record():
    try:
        updated = request.get_json(force=True)
        # 修正 BOM 問題
        if '\ufeffid' in updated:
            updated['id'] = updated.pop('\ufeffid')

        updated.pop("progressLog", None)

        if not isinstance(updated, dict) or "id" not in updated:
            return jsonify(status="error", message="Missing or invalid record ID"), 400

        updated_id = updated["id"]
        updated_data = []
        found = False

        with open(RECORD_FILE, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row.get("id") == updated_id:
                    updated_data.append(updated)
                    found = True
                else:
                    updated_data.append(row)

        if not found:
            return jsonify(status="error", message="Record not found"), 404

        # 備份
        backup_file = RECORD_FILE + ".bak"
        shutil.copy(RECORD_FILE, backup_file)

        # 寫入
        with open(RECORD_FILE, "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.DictWriter(f, fieldnames=RECORD_FILE_FIELD_ORDER)
            writer.writeheader()
            writer.writerows(updated_data)

        return jsonify(status="success", message="Record updated")

    except Exception as e:
        if os.path.exists(RECORD_FILE + ".bak"):
            shutil.copy(RECORD_FILE + ".bak", RECORD_FILE)
        return jsonify(status="error", message=str(e)), 400
    

@app.route("/get_progress/<record_id>", methods=["GET"])
def get_progress(record_id):
    try:
        if not os.path.exists(PROGRESS_FILE):
            return jsonify({"status": "success", "data": []})

        with open(PROGRESS_FILE, mode='r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            records = [row for row in reader if row.get("record_id") == record_id]

        # 時間排序（新 → 舊）
        sorted_records = sorted(records, key=lambda r: r["time"], reverse=True)

        return jsonify({"status": "success", "data": sorted_records})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    

@app.route("/add_progress", methods=["POST"])
def add_progress():
    data = request.json
    if not data or not all(k in data for k in ("record_id", "text")):
        return jsonify({"status": "error", "message": "Missing fields"}), 400

    log = {
        "record_id": data["record_id"],
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "text": data["text"]
    }

    file_exists = os.path.isfile(PROGRESS_FILE)
    with open(PROGRESS_FILE, "a", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=["record_id", "time", "text"])
        if not file_exists:
            writer.writeheader()
        writer.writerow(log)

    return jsonify({"status": "success", "message": "Progress saved", "data": log})


if __name__ == "__main__":
    app.run(debug=True)