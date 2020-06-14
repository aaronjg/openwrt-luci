'use strict';
'require rpc';
'require form';
'require network';
'require tools.widgets as widgets';

network.registerPatternVirtual(/^vpn-.+$/);


return network.registerProtocol('openfortivpn', {
	getI18n: function() {
		return _('OpenFortivpn');
	},

	getIfname: function() {
		return this._ubus('l3_device') || 'vpn-%s'.format(this.sid);
	},

	getOpkgPackage: function() {
		return 'openfortivpn';
	},

	isFloating: function() {
		return true;
	},

	isVirtual: function() {
		return true;
	},

	getDevices: function() {
		return null;
	},

	containsDevice: function(ifname) {
		return (network.getIfnameOf(ifname) == this.getIfname());
	},

	renderFormOptions: function(s) {
		var dev = this.getDevice().getName(),
		    o;

		o = s.taboption('general', form.Value, 'server', _('VPN Server'));
		o.datatype = 'host(0)';

		o = s.taboption('general', form.Value, 'port', _('VPN Server port'));
		o.placeholder = '443';
		o.datatype    = 'port';
		o.nocreate = true;
		o.optional = true;


		s.taboption("general", form.Value, "username", _("Username"));

		o = s.taboption('general', form.Value, 'password', _('Password'));
		o.password = true;

		o = s.taboption('advanced', widgets.NetworkSelect, 'iface_name', _('Bind interface'), _('Bind the tunnel to this interface (optional).'));
		o.nocreate = true;
		o.optional = true;

		s.taboption('advanced', form.Value, 'trusted_cert', _("VPN Server's certificate SHA1 hash"));
		o.nocreate = true;
		o.optional = true;


		o = s.taboption('advanced', form.Flag, 'set_dns', _('Set DNS'));
		o.default = o.enabled;
		o.nocreate = true;
		o.optional = true;

		o = s.taboption('advanced', form.Flag, 'pppd_use_peerdns', _('PPPD Use Peer DNS'));
		o.default = o.enabled;
		o.nocreate = true;
		o.optional = true;

		o = s.taboption('advanced', form.Value, 'metric', _('Use gateway metric'));
		o.placeholder = '0';
		o.datatype    = 'uinteger';
		o.nocreate = true;
		o.optional = true;


	}
});
