/** 解析所有文件的moduleID, 生成config后插到入口文件的头部 */
export declare function addRequireConfig(option: OptionType): any;
interface OptionType {
    mainJs?: string;
    /** 线上部署地址 如/se/static/molecules/toptip/ */
    deloyDir: string;
    /** 编译前脚本路径，用于计算文件相对位置。得出'./static/script/a.js'后与deployDir拼接 */
    sourceDir: string;
}
export {};
