import {ApiServices} from "@/resources/api-service.properties";


export class ad1taftMenuApi {
    constructor() {
         this.ad1taftMenuList = Object.freeze({
            MENU:"GetMenu",
            GETMASTERAPPROVAL:"GetMasterApproval", /* GET MASTER APPROVAL */
            GETMONITORINGAPPROVAL:"GetMonitoringApproval", /* get monitoring approval untuk user */
            GETMONITORINGAPPROVALDETAIL:"GetDetailMonitoringApproval", /* get DETAIL untuk user */
            GETEMAIL:"GetEmail", /* GET PARA EMAIL */
            GETEMAILATASAN:"GetAllEmailAtasan", /* GET EMAIL atasan / bawahan */
            GETBANKID:"GetAllBankID", /* untuk get all bank id */
            GETALLSUBBANKBYBANKID:"GetAllSubBankByID",
            GETALLFASILITASPENDANAAN:"GetAllFasilitasPendanaan", /* get allfasilitas pendanaan */
            GETALLGROUPOBJT:"GetAllObjtGroup", /* untuk get all objt group */
            GETCABANG:"Getbranchid", /* get cabang */
            GETCLASSOBJT:"GetClassObjectByGroupObject", /* get class object untuk bank criteria */
            GETVERSION:"GetVersionWeb", /* untuk version web */
            GETBATCHNOOBLIGASI:"GetBatchNo", /* untuk get batch NO umum */
            GETBANKIDBYSKEMABANK:"GetBankIDByBankSchema",/* untuk get bank JF dan NJF

/* LOG API dan UI Service API */
            SAVELOGMENU:"SaveLogs",
            SAVELOGAPIMENU:"SaveLogAPI"
        })
        const url = new ApiServices("menu");
        // console.log(" url.getService : ", urlBase.getService)
        this.urlBase = url.getService
    }
}
