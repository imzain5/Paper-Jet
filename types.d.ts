declare module "mammoth/mammoth.browser" {
  export interface ConvertOptions {
    arrayBuffer: ArrayBuffer;
  }
  export interface ConvertResult {
    value: string;
    messages: Array<{ type: string; message: string }>;
  }
  export function extractRawText(options: ConvertOptions): Promise<ConvertResult>;
  export function convertToHtml(options: ConvertOptions): Promise<ConvertResult>;
  const mammoth: {
    extractRawText: typeof extractRawText;
    convertToHtml: typeof convertToHtml;
  };
  export default mammoth;
}
