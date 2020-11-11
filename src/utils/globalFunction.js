export default {
    //防抖
    debounce(func, wait) {
        let timeout;
        return function () {
            const context = this;
            const args = [...arguments];
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait)
        }
    },
    //节流
    throttle(func, wait) {
        let timeout;
        return function () {
            let context = this;
            let args = arguments;
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }

        }
    }
}