// 是否使用本地API接口
export const localAPI = false;
// 是否使用线上API接口
export const publicAPI = false;
// 服务域名地址 weboa / xinsteel

export const ctx = 'xinsteel.ytg';

// ajax域名地址
// //113.240.231.242:8084
// //localhost:8803  192.168.211.148 本机（开发版启用代理） http://192.168.1.152:8803  127.0.0.1:8080  192.168.211.123:8803
// //192.168.211.131:8080 易鑫
// //192.168.1.180:8005 赵钱的接口连外网不能访问，要连内网
// 172.16.4.170  172.16.4.170 监控地址

// 本地配置 192.168.1.165:8803 / 127.0.0.1:8080
// const domain = 'http://127.0.0.1:8080'; // /xinsteel.makets/service
// const domain2 = 'http://127.0.0.1:8080'; // S2 /XG/service
// const domain0 = 'http://127.0.0.1:8080'; // S0生产采集监控地址
// const domainFile = 'http://127.0.0.1:8080'; // 文件地址

// // 公司服务器配置 192.168.1.234:8080
const domain = 'http://113.240.231.242:8084'; // /xinsteel.makets/service
const domain2 = 'http://113.240.231.242:8084'; // S2 /XG/service
const domain0 = 'http://113.240.231.242:8084'; // S0生产采集监控地址
const domainFile = 'http://113.240.231.242:8084'; // 文件地址

// 现场内网配置
// const domain = 'http://172.16.4.170'; // /xinsteel.makets/service
// const domain2 = 'http://172.16.4.170'; // S2 /XG/service
// const domain0 = 'http://172.16.4.170'; // S0生产采集监控地址
// const domainFile = 'http://172.16.4.170'; // 文件地址

// xinsteel.cutDeal
// 暂时的 '/xinsteel.maketx/service'
// ajax default
export const ajaxCtx = domain + '/xinsteel.maketx/service';
// ajax url starts with S2/...x   /XG/service /  /xinsteel.makets/service
export const ajaxCtx2 = domain2 + '/xinsteel.maketx/service';
// ajax url starts with S0/...
export const ajaxCtx0 = domain0; //
// 文件上传地址
// icore-file-svr/fdfs/file/upload.do / icore-file-svr-test/fdfs/file/upload.do
export const fileUploadUrl = domainFile + 'icore-file-svr-test/fdfs/file/upload.do';
// 文件下载地址
// icore-file-svr/fdfs/file/download.do / icore-file-svr-test/fdfs/file/download.do
export const fileDownloadUrl = domainFile + 'icore-file-svr-test/fdfs/file/download.do';
// 图片所在域名地址
export const imgBaseUrl = domainFile + '';
// 文件所在域名地址
export const fileBaseUrl = domainFile + '';
// cookie名
export const cookieUserId = 'xinsteel.ytg_Authorization';

export const cookieUserName = 'xinsteel.ytg_userName';
// cookie默认有效时间（小时）
export const cookieTime = 24;

// 物流仓库编码
export const storageAttr = '';
// 指定机台号（写死）
export const machineCode = 'M0001';
