(function () {
    var jxq = {
        getId: function (id) {
            return typeof id === 'string' ? document.getElementById(id) : id
        },
        getClass: function (className, parent) {
            return (parent || document).getElementsByClassName(className)
        },
        getTag: function (tagName, parent) {
            return (parent || document).getElementsByTagName(tagName)
        },
        on: function (element, type, handler) {
            return element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent('on' + type, handler);
        },
        bind: function (objcet, handler) {
            return function () {
                return handler.apply(objcet, arguments);
            };
        },
        show: function (element) {
            element.style.opacity = 1;
        },
        hide: function (elememt) {
            elememt.style.opacity = 0;
        }
    };

    function AppSlide(id) {
        this.init(id);
    }

    AppSlide.prototype = {
        init: function (id) {
            var that = this;
            this.slide = jxq.getId(id);
            this.small = jxq.getClass('small', this.slide)[0];
            this.list = jxq.getTag('ul', this.small)[0];
            this.li = jxq.getTag('li', this.list);
            this.btn = jxq.getClass('btn', this.small)[0];
            this.smallHeight = this.small.offsetHeight;
            this.liHeight = jxq.getTag('li', this.list)[0].offsetHeight;
            this.count = this.smallHeight / this.liHeight;

            this.createBtn();
            this.createBigWrap();
            this.move();
            this.autoTimer = setInterval(function () {
                that.move();
            }, 3000);

            jxq.on(this.small, 'mouseover', function () {
                clearInterval(that.autoTimer);
                jxq.show(that.btn);
            });
            jxq.on(this.small, 'mouseout', function () {
                that.autoTimer = setInterval(function () {
                    that.move();
                }, 3000);
                jxq.hide(that.btn);
            });
            jxq.on(this.btn, 'click', jxq.bind(this, this.move));

        },
        move: function () {
            var that = this;
            this.list.insertBefore(this.li[this.li.length - 1], this.list.firstChild);
            this.list.style.top = '-' + this.liHeight + 'px';
            var timer = setInterval(function () {
                that.list.style.top == '0px' ? clearInterval(timer) : (that.list.style.top = that.list.offsetTop + 10 + "px");
            }, 50);
            this.showBigImg();
        },
        showBigImg: function () {
            var imgSrc = this.li[this.count].firstChild.cloneNode(true);
            this.bigWrap.innerHTML = '';
            this.bigWrap.appendChild(imgSrc);
        },
        createBigWrap: function () {
            this.bigWrap = document.createElement('div');
            this.slide.insertBefore(this.bigWrap, this.small);
            this.bigWrap.className = 'big-wrap';
        },
        createBtn: function () {
            this.btn = document.createElement('div');
            this.small.appendChild(this.btn);
            this.btn.className = 'btn';
            this.btn.innerText = '下一张';
        }
    };

    window.onload = function () {
        new AppSlide(jxq.getId('AppSlide'));
    }
})();
