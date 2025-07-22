const app = Vue.createApp({
    data() {
        return {
            data: [
            ],
            searchQuery: '',
            showUploadCard: false,
            showViewModal: false,
            isEditing: false,
            selectedItem: {},
            newItem: {
                batchNumber: '', 
                abnormalTime: '',
                data: '', 
                lc: '', 
                client: '',
                lowYield: 0,
                yield: 0, 
                quantity: 0, 
                building: '',
                floor: '',
                station: '',
                currentSite: '', 
                status: '', 
                is8D: false,
                isUnreported: false,
                closeDay: '',
                finalShipmentYield: 0,
                description: '', 
            },

            filters: {
                keyinDay: [],
                data: [], 
                description: [], 
                lc: [], 
                quantity: [], 
                batchNumber: [],
                yield: [], 
                currentSite: [], 
                client: [],
                status: [], 
                closeDay: []
            },
            selectAllKeyinDay: true,
            selectAllData: true,
            selectAllDescription: true,
            selectAllLc: true,
            selectAllQuantity: true,
            selectAllBatchNumber: true,
            selectAllYield: true,
            selectAllCurrentSite: true,
            selectAllClient: true,
            selectAllStatus: true,
            selectAllCloseDay: true,
            activeFilter: '',
            popupX: 0,
            popupY: 0,
            activeTab: 'edit',
            newProgressNote: '',
            selectedItem: {}, // 確保 selectedItem 是物件
        };
    },

    computed: {
        uniqueKeyinDay() {
            return Array.from(new Set(
                this.data.filter(i => {
                const f = this.filters;
                const matchData = f.data.length === 0 || f.data.includes(i.data);
                const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                const matchClient = f.client.length === 0 || f.client.includes(i.client);
                const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                return matchData && matchDescription && matchLc && matchQty && matchBatch && matchYield && matchSite && matchClient && matchStatus && matchClose;
                }).map(i => i.keyinDay?.slice(0, 7)).filter(Boolean)
            )).sort((a, b) => new Date(b) - new Date(a));
        },
        uniqueData() {
            return Array.from(new Set(
                this.data.filter(i => {
                    const f = this.filters;
                    const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                    const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                    const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                    const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                    const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                    const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                    const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                    const matchClient = f.client.length === 0 || f.client.includes(i.client);
                    const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                    const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                    return matchKeyinDay && matchDescription && matchLc && matchQty && matchBatch && matchYield && matchSite && matchClient && matchStatus && matchClose;
                }).map(i => i.data).filter(Boolean)
            )).sort();
        },
        uniqueDescription() {
            return Array.from(new Set(
                this.data.filter(i => {
                const f = this.filters;
                const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                const matchData = f.data.length === 0 || f.data.includes(i.data);
                const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                const matchClient = f.client.length === 0 || f.client.includes(i.client);
                const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                return matchKeyinDay && matchData && matchLc && matchQty && matchBatch && matchYield && matchSite && matchClient && matchStatus && matchClose;
                }).map(i => i.description).filter(Boolean)
            )).sort();
        },
        uniqueLc() {
            return Array.from(new Set(
                this.data.filter(i => {
                    const f = this.filters;
                    const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                    const matchData = f.data.length === 0 || f.data.includes(i.data);
                    const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                    const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                    const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                    const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                    const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                    const matchClient = f.client.length === 0 || f.client.includes(i.client);
                    const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                    const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                    return matchKeyinDay && matchData && matchDescription && matchQty && matchBatch && matchYield && matchSite && matchClient && matchStatus && matchClose;
                }).map(i => i.lc).filter(Boolean)
            )).sort();
        },
        uniqueQuantity() {
            return Array.from(new Set(
                this.data.filter(i => {
                    const f = this.filters;
                    const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                    const matchData = f.data.length === 0 || f.data.includes(i.data);
                    const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                    const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                    const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                    const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                    const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                    const matchClient = f.client.length === 0 || f.client.includes(i.client);
                    const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                    const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                    return matchKeyinDay && matchData && matchDescription && matchLc && matchBatch && matchYield && matchSite && matchClient && matchStatus && matchClose;
                }).map(i => i.quantity).filter(Boolean)
            )).sort((a, b) => a - b);
        },
        uniqueBatchNumber() {
            return Array.from(new Set(
                this.data.filter(i => {
                    const f = this.filters;
                    const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                    const matchData = f.data.length === 0 || f.data.includes(i.data);
                    const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                    const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                    const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                    const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                    const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                    const matchClient = f.client.length === 0 || f.client.includes(i.client);
                    const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                    const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                    return matchKeyinDay && matchData && matchDescription && matchLc && matchQty && matchYield && matchSite && matchClient && matchStatus && matchClose;
                }).map(i => i.batchNumber).filter(Boolean)
            )).sort();
        },
        uniqueYield() {
            return Array.from(new Set(
                this.data.filter(i => {
                    const f = this.filters;
                    const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                    const matchData = f.data.length === 0 || f.data.includes(i.data);
                    const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                    const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                    const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                    const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                    const matchClient = f.client.length === 0 || f.client.includes(i.client);
                    const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                    const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                    const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                    return matchKeyinDay && matchData && matchDescription && matchLc && matchQty && matchBatch && matchSite && matchClient && matchStatus && matchClose;
                }).map(i => i.yield).filter(Boolean)
            )).sort((a, b) => a - b);
        },
        uniqueCurrentSite() {
            return Array.from(new Set(
                this.data.filter(i => {
                    const f = this.filters;
                    const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                    const matchData = f.data.length === 0 || f.data.includes(i.data);
                    const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                    const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                    const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                    const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                    const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                    const matchClient = f.client.length === 0 || f.client.includes(i.client);
                    const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                    const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                    return matchKeyinDay && matchData && matchDescription && matchLc && matchQty && matchBatch && matchYield && matchClient && matchStatus && matchClose;
                }).map(i => i.currentSite).filter(Boolean)
            )).sort();
        },
        uniqueClient() {
            return Array.from(new Set(
                    this.data.filter(i => {
                    const f = this.filters;
                    const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                    const matchData = f.data.length === 0 || f.data.includes(i.data);
                    const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                    const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                    const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                    const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                    const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                    const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                    const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                    const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                    return matchKeyinDay && matchData && matchDescription && matchLc && matchQty && matchBatch && matchYield && matchSite && matchStatus && matchClose;
                    }).map(i => i.client).filter(Boolean)
            )).sort();
        },
        uniqueStatus() {
            return Array.from(new Set(
                this.data.filter(i => {
                    const f = this.filters;
                    const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                    const matchData = f.data.length === 0 || f.data.includes(i.data);
                    const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                    const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                    const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                    const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                    const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                    const matchClient = f.client.length === 0 || f.client.includes(i.client);
                    const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                    const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));
                    return matchKeyinDay && matchData && matchDescription && matchLc && matchQty && matchBatch && matchYield && matchClient && matchSite && matchClose;
                }).map(i => i.status).filter(Boolean)
            )).sort();
        },
        uniqueCloseDay() {
            return Array.from(new Set(
                this.data.filter(i => {
                    const f = this.filters;
                    const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                    const matchData = f.data.length === 0 || f.data.includes(i.data);
                    const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                    const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                    const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                    const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                    const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                    const matchClient = f.client.length === 0 || f.client.includes(i.client);
                    const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                    const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                    return matchKeyinDay && matchData && matchDescription && matchLc && matchQty && matchBatch && matchYield && matchClient && matchSite && matchStatus;
                }).map(i => i.closeDay?.slice(0, 7)).filter(Boolean)
            )).sort((a, b) => new Date(b) - new Date(a));
        },
        filteredData() {
            return this.data.filter(i => {
                const f = this.filters;
                const matchKeyinDay = f.keyinDay.length === 0 || f.keyinDay.includes(i.keyinDay?.slice(0, 7));
                const matchData = f.data.length === 0 || f.data.includes(i.data);
                const matchDescription = f.description.length === 0 || f.description.includes(i.description);
                const matchLc = f.lc.length === 0 || f.lc.includes(i.lc);
                const matchQty = f.quantity.length === 0 || f.quantity.includes(i.quantity);
                const matchBatch = f.batchNumber.length === 0 || f.batchNumber.includes(i.batchNumber);
                const matchYield = f.yield.length === 0 || f.yield.includes(i.yield);
                const matchSite = f.currentSite.length === 0 || f.currentSite.includes(i.currentSite);
                const matchClient = f.client.length === 0 || f.client.includes(i.client);
                const matchStatus = f.status.length === 0 || f.status.includes(i.status);
                const matchClose = f.closeDay.length === 0 || f.closeDay.includes(i.closeDay?.slice(0, 7));

                const matchSearch = !this.searchQuery || Object.values(i).some(val =>
                    String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
                );

                return matchKeyinDay && matchData && matchDescription && matchLc && matchQty && matchBatch && matchYield && matchSite && matchClient && matchStatus && matchClose && matchSearch;
            });
        }
    },
    watch: {
        showUploadCard(val) {
            document.body.classList.toggle('overflow-hidden', val);
        },
        showViewModal(val) {
            document.body.classList.toggle('overflow-hidden', val);
        }
    },
    methods: {
        getData(){
            fetch('http://127.0.0.1:5000/get_records')
                .then(res => res.json())
                .then(response => {
                    if (response.status === "success") {
                        this.data = response.data.map(row => {
                            // 將 BOM id 欄位轉換成正常 id
                            if ('\ufeffid' in row) {
                                row.id = row['\ufeffid'];
                                delete row['\ufeffid'];
                            }
                            return row;
                        });
                        this.data = response.data.reverse();
                    } else {
                        console.error("讀取資料失敗：", response.error);
                    }
                })
                .catch(err => {
                    console.error("載入初始資料錯誤：", err);
                });
        },

        showFilter(field, event) {
            this.activeFilter = field;
            this.popupX = event.clientX;
            this.popupY = event.clientY + 10;
        },

        toggleFilter(field) {
            this.activeFilter = this.activeFilter === field ? '' : field;
        },
        getStatusClass(status) {
            const statusClasses = {
                '進行中': 'bg-blue-100 text-blue-800',
                '已完成': 'bg-green-100 text-green-800',
                '暫停': 'bg-yellow-100 text-yellow-800',
                '取消': 'bg-red-100 text-red-800'
            };
            return statusClasses[status] || 'bg-gray-100 text-gray-800';
        },
        closeUploadCard() {
            this.showUploadCard = false;
            this.resetNewItem();
        },
        resetNewItem() {
            this.newItem = {
                batchNumber: '', 
                abnormalTime: '',
                data: '', 
                lc: '', 
                client: '',
                lowYield: 0,
                yield: 0, 
                quantity: 0, 
                building: '',
                floor: '',
                station: '',
                currentSite: '', 
                status: '', 
                is8D: false,
                isUnreported: false,
                closeDay: '',
                finalShipmentYield: 0,
                description: '', 
            };
        },
        submitData() {
            const newId = Math.max(...this.data.map(item => item.id)) + 1;
            this.data.unshift({ id: newId, ...this.newItem });
            this.closeUploadCard();
            this.showNotification('數據已成功添加！', 'success');
        },
        async editItem(item) {
            this.selectedItem = {
                ...item,
                progressLog: item.progressLog || []
            };
            this.activeTab = 'edit';
            this.isEditing = true;
            this.showViewModal = true;
            try {
                const res = await fetch(`http://127.0.0.1:5000/get_progress/${item.id}`);
                const result = await res.json();
                if (result.status === "success") {
                    this.selectedItem.progressLog = result.data;
                } else {
                    console.warn("取得進度失敗", result.message);
                }
            } catch (err) {
                console.error("讀取留言失敗", err);
            }
        },
        async updateItem() {
            console.log(JSON.parse(JSON.stringify(this.selectedItem)));
            try {
                const response = await fetch("http://127.0.0.1:5000/update_record", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.selectedItem)
                });

                const result = await response.json();
                if (result.status === "success") {
                    // 更新前端資料
                    const index = this.data.findIndex(item => item.id === this.selectedItem.id);
                    if (index !== -1) {
                        this.data[index] = { ...this.selectedItem };
                    }

                    this.showNotification("數據已成功更新！", "success");
                    this.closeViewModal();
                    this.getData();
                } else {
                    alert("儲存失敗：" + result.message);
                }
            } catch (err) {
                console.error(err);
                alert("更新時發生錯誤！");
            }
        },
        deleteItem(id) {
            if (confirm('確定要刪除這筆數據嗎？')) {
                this.data = this.data.filter(item => item.id !== id);
                this.showNotification('數據已成功刪除！', 'success');
            }
        },
        closeViewModal() {
            this.showViewModal = false;
            this.isEditing = false;
            this.selectedItem = {};
        },
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 transform translate-x-full`;
            const typeClasses = {
                success: 'bg-green-500',
                error: 'bg-red-500',
                warning: 'bg-yellow-500',
                info: 'bg-blue-500'
            };
            notification.className += ` ${typeClasses[type] || typeClasses.info}`;
            notification.textContent = message;
            document.body.appendChild(notification);
            setTimeout(() => notification.classList.remove('translate-x-full'), 100);
            setTimeout(() => {
                notification.classList.add('translate-x-full');
                setTimeout(() => document.body.removeChild(notification), 300);
            }, 3000);
        },
        openUploadCard() {
            const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
            this.newItem = {
                batchNumber: '', 
                abnormalTime: '',
                data: '',
                lc: '',
                client: '',
                lowYield: '',
                yield: '',
                quantity: '',
                building: '',
                floor: '',
                station: '',
                currentSite: '',
                status: '',
                is8D: false,
                isUnreported: false,
                closeDay: '',
                finalShipmentYield: '',
                description: ''
            };
            this.showUploadCard = true;
        },
        async addSaveToBackend() {

            fetch('http://127.0.0.1:5000/add_record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newItem)
            })
            .then(res => res.json())
            .then(response => {
                if (response.status === "success") {
                    alert("資料已成功儲存到 records.csv！");
                    this.closeUploadCard()
                    this.getData()
                } else {
                    alert("儲存失敗：" + response.message);
                }
            })
            .catch(err => {
                console.error(err);
                alert("儲存時發生錯誤！");
            });
        },
        async addProgressNote() {
            console.log(JSON.parse(JSON.stringify(this.selectedItem)));
            if (!this.newProgressNote.trim()) return;

            fetch('http://127.0.0.1:5000/add_progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    record_id: this.selectedItem.id,
                    text: this.newProgressNote.trim()
                })
            })
            .then(res => res.json())
            .then(response => {
                if (response.status === "success") {
                // 把新增留言加到本地顯示
                if (!this.selectedItem.progressLog) {
                    this.selectedItem.progressLog = [];
                }
                this.selectedItem.progressLog.unshift(response.data);
                this.newProgressNote = '';
                } else {
                alert("留言儲存失敗：" + response.error);
                }
            })
            .catch(err => {
                console.error(err);
                alert("儲存留言時發生錯誤！");
            });
        },
        toggleAllKeyinDay() {
            this.filters.keyinDay = this.selectAllKeyinDay ? [...this.uniqueKeyinDay] : [];
        },
        toggleAllData() {
            this.filters.data = this.selectAllData ? [...this.uniqueData] : [];
        },
        toggleAllDescription () {
            this.filters.description = this.selectAllDescription ? [...this.uniqueDescription] : [];
        },
        toggleAllLc() {
            this.filters.lc = this.selectAllLc ? [...this.uniqueLc] : [];
        },
        toggleAllQuantity() {
            this.filters.quantity = this.selectAllQuantity ? [...this.uniqueQuantity] : [];
        },
        toggleAllBatchNumber() {
            this.filters.batchNumber = this.selectAllBatchNumber ? [...this.uniqueBatchNumber] : [];
        },
        toggleAllYield() {
            this.filters.yield = this.selectAllYield ? [...this.uniqueYield] : [];
        },
        toggleAllCurrentSite() {
            this.filters.currentSite = this.selectAllCurrentSite ? [...this.uniqueCurrentSite] : [];
        },
        toggleAllClient() {
            this.filters.client = this.selectAllClient ? [...this.uniqueClient] : [];
        },
        toggleAllStatus() {
            this.filters.status = this.selectAllStatus ? [...this.uniqueStatus] : [];
        },
        toggleAllCloseDay() {
            this.filters.closeDay = this.selectAllCloseDay ? [...this.uniqueCloseDay] : [];
        },
        handleClickOutside(event) {
            const filterPopups = document.querySelectorAll('.filter-popup');
            const isClickInside = Array.from(filterPopups).some(popup => popup.contains(event.target));
            const isButton = event.target.closest('button');
            if (!isClickInside && !isButton) {
                this.activeFilter = '';
            }
        },
        formatDescription(text) {
            if (!text) return '';
            
            // 先按照原有的換行分割
            const lines = text.split('\n');
            
            // 對每一行進行30字限制處理
            const formattedLines = lines.map(line => {
                if (line.length <= 30) return line;
                
                // 每30字插入換行
                const chunks = [];
                for (let i = 0; i < line.length; i += 30) {
                    chunks.push(line.substring(i, i + 30));
                }
                return chunks.join('\n');
            });
            
            return formattedLines.join('\n');
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
        AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
        this.getData()
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },

});

app.mount('#app');
