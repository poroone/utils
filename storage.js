/**
 * storage 二次封装
 * @author PoOne
 */
const namespace = "test"
export default {
    namespace,
    /**
     * 
     * @param {*} name 命名空间
     */
    setNamespace(name,) {
        this.namespace = name
        return this.namespace
    },
    /**
     * 
     * @param {*} oldName 旧的name
     * @param {*} newName 新的name
     * @returns 
     */
    copyNamespace(oldName, newName) {
        if (!oldName || !newName) return new Error("参数错误")
        const oldLocal = this.getStorage(oldName)
        const newLocal = this.getStorage(newName)
        const obj = Object.assign(newLocal, oldLocal)
        return window.localStorage.setItem(newName, JSON.stringify(obj))
    },
    /**
     * 
     * @param {*} key  存储的key
     * @param {*} value 存储的value
     * @returns 
     */
    setItem(key, value) {
        let oldLocal = this.getStorage()
        oldLocal[key] = value
        return window.localStorage.setItem(this.namespace, JSON.stringify(oldLocal))
    },
    /**
     * 
     * @param {*} key 需要拿到的key
     * @returns 
     */
    getItem(key) {
        return this.getStorage()[key]
    },
    /**
     * 
     * @param {} name 或获取指定命名空间的值
     * @returns  object
     */
    getStorage(name) {
        let storage = {}
        if (name) {
            storage = JSON.parse(window.localStorage.getItem(name) || "{}")
        } else {
            storage = JSON.parse(window.localStorage.getItem(this.namespace) || "{}")
        }
        return storage
    },
    /**
     * 
     * @param {*} key 需要清除的key
     */
    clearItem(key) {
        let storage = this.getStorage()
        delete storage[key]
        window.localStorage.setItem(this.namespace, JSON.stringify(storage))
    },
    /**
     * 清除全部 localStorage
     */
    clearAll() {
        window.localStorage.clear()
    }
}