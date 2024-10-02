export let _user_app_access = {
    nik: null,
    groupAlias: "",
    appAlias: "",
    menu: "",
    status: ""
}

export let _user_credential = {
    username: null,
    nik: null,
    branchCode: null,
    sapBranchCode: null,
    branchName: null,
    branchDisplayName: null,
    fullName: null,
    roleId: null,
    role: null,
    groupJob: null,
    email: null,
    loginStatus: null,
    ipAddress: null,
    noHp: null,
    grantedMenus: {
        type: Array,
        default: null
    },
    idActiveForm: "IDM_CLAR_HOME",
    grantedActiveForms: [],
    ui: null,
    locationHO: null,
    sapLocationHo: null,
    sapLocationAreaCode: null,
    userBranchOrHo: null,
    regionCode: null,
    regionName: null,
}