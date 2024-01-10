import permissionsScheme from "./../permissions";

const useRule = {
  data: () => ({
    staticPermission: permissionsScheme,
    permissions: [],
    route: ""
  }),
  methods: {
    hasAccess(method) {
      // console.log(this.permissions);
      if (this.permissions != null) {
        const permission = this.permissions.find(x => x.value == this.route);
        if (permission == undefined) return false;
        if (permission[method] == undefined) return false;
        return permission[method];
      }
      return false;
    },
    getActionsByPermissions(permission) {
      const res = staticPermission.find(x => x.value == permission);
      if (res != undefined) return res.actions;
      return [];
    }
  },
  async created() {
    const userPermissions = await localStorage.getItem("permissions");
    if (userPermissions) this.permissions = JSON.parse(userPermissions);
    else this.permissions = {};
  }
};

export default useRule;
