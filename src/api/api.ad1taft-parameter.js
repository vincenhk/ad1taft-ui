import {ApiServices} from "@/resources/api-service.properties";

export class ad1taftParameterApi {
    constructor() {
        this.ad1ParameterList = Object.freeze({
            /* parameter Service API */
            GETVERSION: "GetVersionWeb",

            /* Parameter Additional Rate */
            GETBANKRESTRUKTUR: "GetBankRestruktur",
            GETOBJECTCODE: "GetObjectCode",
            GETADDITIONALRATE: "GetAdditionalRate",
            GETADDITIONALRATETMP: "GetAdditionalRateTMP",
            SAVEADDITIONALRATE: "InsertAdditionalRate",
            UPDATEADDITIONALRATE: "UpdateAdditionalRate",
            DELETEADDITIONALRATE: "DeleteAdditionalRate",
            APPROVALADDITIONALRATE: "ApprovalAdditionalRate",

            /* Parameter Agreement Bank Service API */
            GETFUNDLOANMAST: "GetFundLoanMast",
            GETFUNDLOANMASTTMP: "GetFundLoanMastTMP",
            GETLOANIDSEQ: "GetLoanIdSequence",
            GETLOANMASTBYID: "GetByLoanIdFundLoanMast",
            SAVELOANMAST: "SaveFundLo~anMast",
            SAVELOANMASTTEAPPROVE: "SaveFundLoanMastAppr",
            SAVELOANMASTRJCT: "SaveFundLoanMastRjct",
            UPDATELOANMAST: "UpdateFundLoanMast",
            UPDATELOANMASTAPPROVE: "UpdateFundLoanMastAppr",
            DELETELOANMAST: "DeleteFundLoanMast",
            DELETELOANMASTAPPROVE: "DeleteFundLoanMastAppr",
            GETLOANMASTBYBANKSUB: "GetByBankSubFundLoanMast",
            GETLOANMASTBYAGREENO: "GetByAgreeNoFundLoanMast",
            GETPLAFONDTYPE: "GetPlafondTypeId",
            GETPAYMENTTYPE: "GetPaymentTypeId",
            GETPENALTYTYPE: "GetPenaltyTypeId",
            GETFLOATSTATUS: "GetFloatStatusId",
            GETFUNDLOANMASTBYBANK: "GetFundLoanMastByBank",

            /* Parameter Bank Pendanaan Service API */
            GETPARABANK: "GetAllParaBank", /* get bankid bank approve */
            GETPORSIBANKID: "GetAllPorsiBankByID", /* get porsi bank by bank id dari table PARA_BANK_PORTION_GROUP */
            GETPARABANKBYID: "GetAllParaBankByID",
            SAVEPARABANK: "SaveParaBank",
            UPDATEPARABANK: "UpdateParaBank",
            DELETEPARABANK: "DeleteParaBank",
            CONFRIMPARABANK: "ConfirmBank", /* UNTUK CONFRIM PARA BANK */
            GETTMPPARABANK: "GetTmpParaBank", /* GET TEMP DATA PARA BANK UNTUK APPROVAL */

            /* Parameter Entri Bank Criteria JF Service API */
            GETSKEMABANK: "GetBankSchema",
            GETTMPBANKKRITERIASUM: "GetTmpBankKriteriaSum", /* GET TMP BANK KRITERIA SUM */
            GETDATAKRITERIA: "GetDataKriteria", /* GET DATA FISIK KRITERIA BY BANK DAN SUB BANK */
            GETTMPBANKKRITERIA: "GetTmpBankKriteria", /* GET TMP BANK KRITERIA */
            GETBANKIDEXISTKRITERIA: "GetBankIDExist",
            GETTYPEOBJT: "GetTypeObjectByGroupObject", /* get type object untuk bank criteria */
            GETMERKOBJT: "GetMerkObjectByGroupAndTypeObject", /* get merek object untuk bank criteria */
            GETMKPPID: "GetMkppID", /* get all mkppid */
            GETSALESTHROUGH: "GetParaSalesThrough", /* get all salesthrough */
            GETPRODMATRIX: "GetParaProdMatrix", /* get all produk matrix */
            GETTIPEANGSURAN: "GetAngsuranType", /* get tipe angsuran */
            GETLENDINGRATE: "GetLendingRate", /* get lendingrate */
            GETPORSIBANKCRITERIA: "GetBankPortionByBankID", /* get bank porsi by bankid & bank skema */
            GETADVANCEARREAR: "GetAdvanceArrear", /* get tipe advance */
            SAVEBANKCRITERIA: "SaveDataBankCriteriaHistory",
            APPROVALBANKKRITERIA: "ApprovalBankKriteria", /* APPROVAL BANK KRITERIA */
            REPLICATEBANKKRITERIA: "ReplicateBankCriteria", /* REPLICATE BANK KRITERIA */
            //	GETALLBANKCRITERIA:"GetAllBankCriteria",
            GETBANKCRITERIAHISTORY: "GetBankCriteriaHistory",
            GETALLBCHISTORY: "GetAllBCHistory",
            DELETEBCHISTORY: "DeleteBCHistory",
            GETSUBBANKJF: "GetSubBankJF", /* untuk ambil sub bank JF*/
            VIEWLENDINGRATE: "ViewLendingRate",
            UPLOADBANKCRITERIA: "UploadExcelFile",

            /* Parameter Entri Bank Criteria NJF */
            SAVEBANKCRITERIANJF: "SaveDataBankCriteriaNJF",
            APPROVALBANKKRITERIANJF: "ApprovalBankKriteriaNJF", /* APPROVAL BANK KRITERIA NJF */

            /* Parameter Bank Portion Sevice API */
            GETBANKPORTION: "GetDataBankPortion", // get all bank portion
            GETDATABANKPORTIONTMP: "GetAllBankPortionTMP",
            SAVEBANKPORTION: "AddDataBankPortion",
            ADDDATABANKPORTIONAPPR: "AddDataBankPortionAppr",
            ADDDATABANKPORTIONRJCT: "AddDataBankPortionRjct",
            DELETEBANKPORTION: "DeleteDataBankPortion",
            DELETEDATABANKPORTIONAPPR: "DeleteDataBankPortionAppr",

            /* Parameter DP NETT Service API */
            GETALLPARADP: "GetAllParaDp",
            GETALLPARADPTMP: "GetAllParaDpTMP",
            GETALLBYCONDP: "GetAllByConParaDp",
            SAVEPARADP: "SaveParaDp",
            UPDATEPARADP: "UpdateParaDp",
            DELETEPARADP: "DeletedParaDp",
            APPROVALPARADP: "ApprovalDp",

            /* Parameter LTV NETT Service API */
            GETALLBYCONLTV: "GetAllByConParaLtv",

            //	GETLTVBYCON:"GetAllByConParaLtv",
            GETALLLTV: "GetAllParaLtv",
            GETALLLTVTMP: "GetAllParaLtvTMP",
            SAVELTV: "SaveParaLtv",
            UPDATELTV: "UpdateParaLtv",
            DELETELTV: "DeletedParaLtv",
            APPROVALPARALTV: "ApprovalLtv",

            /* Parameter Fasilitas Pendanaan Service API */
            GETTMPFAILITASPENDANAAN: "GetDataTMPFacility", /* GET ALL TEMP FASILITAS PENDANAAN */
            SAVEFACILITYPENDANAAN: "SaveFacilityPendanaan",
            APPROVALFASILITASPENDANAAN: "ApprovalFacilityPendanaan",
            UPDATEFACILITYPENDANAAN: "UpdateFacilityPendanaan",
            DELETEFACILITYPENDANAAN: "DeleteFacilityPendanaan",
            GETSEQ: "GetDataSeq", /* untuk get sequence fasilitas pendanaan */
            UPDATESEQ: "UpdateSeq", /* untuk update sequence fasilitas pendanaan */
            //ADDFACILITYPENDANAAN:"AddFacilityPendanaan", /* tidak ada di service api */

            /* Parameter Grace Periode Service API */
            JOINGRACEPERIODE: "JoinGracePeriode", /* untuk save grace periode */
            GETGRACEPERIODE: "GetAllGracePeriode", /* untuk get view grace periode */
            GETTMPGRACEPERIODE: "GetAllTmpGracePeriode", /* UNTUK GET VIEW TMP APPROVAL GRACE PERIODE */
            APPROVALGRACEPERIODE: "ConfirmGrace", /* UNTUK PROSES APPROVAL GRACE PERIODE */
            UPDATEGRACEPERIODE: "UpdateGracePeriode",
            DELETEGRACEPERIODE: "DeleteGracePeriode",

            /* Parameter Group Bank Service API */
            GETBANKGROUP: "GetAllParaBankGroup", /* untuk get all group bank */
            GETALLPARABANKGROUPTMP: "GetAllParaBankGroupTMP",
            SAVEBANKGROUP: "SaveParaBankGroup",
            UPDATEBANKGROUP: "UpdateParaBankGroup",
            DELETEBANKGROUP: "DeleteParaBankGroup",
            ACTIVEBANKGROUP: "ActiveParaBankGroup",
            CREATEPARAGROUPBANKAPPR: "SaveParaBankGroupAppr",
            SAVEPARABANKGROUPRJCT: "SaveParaBankGroupRjct",
            UPDATEPARABANKGROUPAPPR: "UpdateParaBankGroupAppr",
            DELETEPARABANKGROUPAPPR: "DeleteParaBankGroupAppr",
            AKTIVPARABANKGROUPTMP: "AktivParaBankGroupTmp",

            /* Parameter Historical Adendum */
            GETHISTORICALADENDUM: "GetAllHistoricalAdendum", /* get historikal adendum by bankid,sub bank,no agree */
            GETTMPHISTORICALADENDUM: "GetTmpHistoricalAdendum",
            SAVEHISTORIKALADENDUM: "SaveHistoricalAdendum",
            APPROVEHISTORICALADENDUM: "ApproveHistoricalAdendum",
            REJECTHISTORICALADENDUM: "RejectHistoricalAdendum",

            /* Parameter Porsi Denda Serice API */
            GETPORSIDENDA: "GetAllPorsiDenda",

            /* untuk get porsi denda */
            GETALLPORSIDENDATMP: "GetAllPorsiDendaTMP",
            SAVEPORSIDENDA: "SavePorsiDenda",
            DELETEPORSIDENDA: "DeletePorsiDenda",
            SAVEPORSIDENDAAPPR: "SavePorsiDendaAppr",
            SAVEPORSIDENDARJCT: "SavePorsiDendaRjct",
            DELETEPORSIDENDAAPPR: "DeletePorsiDendaAppr",

            /* Parameter Region Service API */
            GETREGIONNAME: "GetRegionName",
            GETALLREGIONTMP: "GetAllRegionTMP",
            GETREGIONINFO: "GetAllRegionInfo",
            GETALLREGION: "GetAllRegion",
            INSERTREGION: "InsertRegion",
            UPDATEREGION: "UpdateRegion",
            DELETEREGION: "DeleteRegion",
            APPROVALREGION: "ApprovalRegion",

            /* Parameter Sub Bank Service API */
            GETALLSUBBANKTMP: "GetAllSubBankTMP",

            //	GETFISIKSUBBANKBYBANKID:"GetAllFisikSubBankByID",

            /* get sub bank by bankid */
            INSERTSUBBANK: "InsertDataSubBank",
            DELETESUBBANK: "deleteDataSubBank",
            GETSEQSUBBANKID: "GetSeqSubBankID",
            INSERTDATAAPPR: "insertDataAppr",
            DATASUBBANKRJCT: "DataSubBankRjct",
            INSERTDATASUBBANKAPPR: "InsertDataSubBankAppr",
            DELETEDATASUBBANKAPRR: "deleteDataSubBankAppr",

            /* Parameter Bank Portion Service API */
            GETSUBBANKALL: "GetAllSubBank", /* get all sub bank */
            GETBANKPORTIONMG: "GetDataBankPortionMG",
            CONFIRMBANKPORTION: "ConfirmDataBankPortion",
            UPDATEBANKAPPROVE: "UpdateBankApprove",

            /* Parameter Limit Plafon Disburse */
            VIEWLIMITPLAFON: "GetLimitDisb",
            VIEWTMPLIMITPLAFON: "GetTmpLimitDisb",
            SAVELIMITPLAFON: "SaveLimitDisb",
            APPROVELIMITPLAFON: "ApproveLimitDisb",
            REJECTLIMITPLAFON: "RejectLimitDisb",

            /* Parameter Entry Bank Criteria UR */
            //ALL APPROVAL
            APPROVEBANKCRITERIA: "GetApprovalBankCriteria",

            //HEADER
            VIEWBANKCRITERIAHEADER: "GetBankCriteriaHeader",
            INSERTBANKCRITERIAHEADER: "InsertBankCriteriaHeader",
            UPDATEBANKCRITERIAHEADER: "UpdateBCHeader",
            VIEWBANKCRITERIAHEADERAPPROVAL: "GetTmpBCHeader",
            APPROVEBANKCRITERIAHEADER: "ApprovalBCHeader",

            //DETAIL
            VIEWBANKCRITERIADETAIL: "GetBankCriteriaDetail",
            VIEWBANKCRITERIADETAILAPPROVAL: "GetTmpBCDetail",
            APPROVEBANKCRITERIADETAIL: "ApprovalBCDetail",
            GETEXPORTBANKCRITERIA: "GetExportExcel",

            //REPLICATE
            REPLICATEEBC: "ReplicateEntryBankCriteria",

            /* LOG API dan UI Service API */
            SAVELOGPARAM: "SaveLogs",
            SAVELOGAPIPARAM: "SaveLogAPI"
        })

        const url = new ApiServices("Parameter");
        // console.log(" url.getService : ", urlBase.getService)
        this.urlBase = url.getService
    }
}
