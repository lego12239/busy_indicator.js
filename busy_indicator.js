"use strict";

function busy_indicator(cntr_el, img_el, show_cb, hide_cb)
{
	this.el = {};
	this.cb = {show: null, hide: null};
	this.pos = {x: 0, y: 0};


	this._set_prm.call(this.el, "cntr", cntr_el);
	this._set_prm.call(this.el, "img", img_el);
	if (show_cb != undefined)
		this.cb.show = show_cb;
	if (hide_cb != undefined)
		this.cb.hide = hide_cb;

	this.cnt = 0;

	this.align();
}

busy_indicator.prototype._set_prm = function (n, v)
{
	if (( v == undefined ) || ( v == null ))
		throw("busy_indicator: " + n + " is not supplied");
	this[n] = v;
}

busy_indicator.prototype.align = function ()
{
    this.pos.x = window.innerWidth/2 - this.el.img.offsetWidth/2;
    this.pos.y = window.innerHeight/2 - this.el.img.offsetHeight/2;

	this.el.img.style.top = this.pos.y + "px";
	this.el.img.style.left = this.pos.x + "px";
}

busy_indicator.prototype.show = function ()
{
	var top, left;
	var img_el;


	this.cnt++;
	if ( this.cnt > 1 )
		return;

	document.body.onkeypress = function (ev) { ev.preventDefault() };

	this.el.cntr.style.display = "block";
	
	if (this.cb.show != undefined)
		this.cb.show();
}

busy_indicator.prototype.hide = function ()
{
	if ( this.cnt > 0 )
		this.cnt--;
	else
		return;

	if ( this.cnt )
		return;

	document.body.onkeypress = "";

	this.el.cntr.style.display = "none";

	if (this.cb.hide != undefined)
		this.cb.hide();
}
