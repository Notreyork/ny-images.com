! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Mcsub = e()
}(this, function() {
    "use strict";
    var i = function t(e, i) {
        this.config = t.mergeSettings(i), this.element = document.querySelector(e), "" === this.config.user && t.require("user id"), "" === this.config.list && t.require("list id"), this.form = this.element.children[0], this.button = this.form.querySelector('button[type="submit"]'), this.inputs = this.form.querySelectorAll("input"), this.response = this.element.querySelector(this.config.response), this.robot("b_" + this.config.user + "_" + this.config.list), this.init()
    };
    return i.require = function(t) {
        throw new Error("You are missing the " + t + " 😭")
    }, i.mergeSettings = function(t) {
        var e = {
                user: "",
                list: "",
                callback: "cb",
                response: "#response",
                onInit: function() {},
                onSubmit: function() {},
                complete: function() {},
                onSuccess: function() {},
                onError: function() {}
            },
            i = t;
        for (var n in i) e[n] = i[n];
        return e
    }, i.setAttrs = function(t, e) {
        for (var i in e) t.setAttribute(i, e[i])
    }, i.prototype.robot = function(t) {
        var e = document.createElement("input");
        i.setAttrs(e, {
            id: "robot",
            type: "text",
            tabindex: "-1",
            value: "",
            name: t,
            style: "position: absolute; left: -5000px;",
            "aria-hidden": "true"
        }), this.form.appendChild(e)
    }, i.prototype.init = function() {
        var e = this;
        this.url = this.form.action.replace("/post", "/post-json?"), this.form.addEventListener("submit", function(t) {
            return e.submit(t)
        }), this.config.onInit.call(this), this.default()
    }, i.prototype.default = function() {
        i.setAttrs(this.form, {
            action: this.form.action.replace("/post", "/post?u=" + this.config.user + "&id=" + this.config.list),
            method: "post",
            target: "_blank"
        });
        for (var t = 0; t < this.inputs.length; t++) this.inputs[t].id = "mce-" + this.inputs[t].name
    }, i.prototype.submit = function(t) {
        var e = this;
        if (t.preventDefault(), "" !== this.form.lastChild.value) return !1;
        this.config.onSubmit.call(this);
        for (var i = "", n = 0; n < this.inputs.length; n++) i += "u=" + e.config.user + "&id=" + e.config.list + "&c=" + e.config.callback + "&" + e.inputs[n].name + "=" + encodeURIComponent(e.inputs[n].value);
        this.setScript(i)
    }, i.prototype.setScript = function(t) {
        var e = document.createElement("script");
        e.setAttribute("data-id", this.element.id), document.body.appendChild(e), this.getScript('[data-id="' + this.element.id + '"]', t)
    }, i.prototype.getScript = function(t, e) {
        var i = this,
            n = document.querySelectorAll(t);
        if (!n) return !1;
        for (var s = function(t) {
                Promise.resolve().then(function() {
                    1 < t ? n[t].parentElement.removeChild(n[t]) : n[t].src = i.url + e
                }).then(function() {
                    return i.success(n[t])
                })
            }, o = 0; o < n.length; o++) s(o)
    }, i.prototype.respond = function(t, e) {
        var i = this;
        return {
            error: function() {
                t.classList.contains("success") ? t.classList.replace("success", "error") : t.classList.add("error"), t.innerHTML = e.msg.includes(" - ") ? e.msg.substring(3) : e.msg, t.hasAttribute("style") && t.removeAttribute("style"), i.config.onError.call(i)
            },
            success: function() {
                t.classList.contains("error") ? t.classList.replace("error", "success") : t.classList.add("success"), t.innerHTML = e.msg, t.hasAttribute("style") && t.removeAttribute("style"), i.config.onSuccess.call(i)
            }
        } [e.result]()
    }, i.prototype.success = function(e) {
        var i = this;
        window[this.config.callback] = function(t) {
            try {
                delete window[i.config.callback]
            } catch (t) {
                window[i.config.callback] = void 0
            }
            e.parentElement.removeChild(e), i.respond(i.response, t), i.config.complete.call(i)
        }
    }, i
});