import { InterObjectData } from "interObjects/define/interObject";
import { stringify } from "querystring";

export class SketchTextData extends InterObjectData {
  text!: string;
  subname: string = "sketchText";
  maxWidth!: number;
  size!: number;
  color!: {
    foreground: string;
    background: string;
  };
  font!: string;
  style!: {
    bold: boolean;
    italic: boolean;
  };
  line!: {
    over: false;
    through: false;
    under: false;
  };
  permanent!: boolean;
  align!: {
    left: boolean;
    center: boolean;
    justify: boolean;
    right: boolean;
  };
  // loadFromJSON(json: string) {
  //   const obj: any = JSON.parse(json)
  //   this.name =
  //     'name' in obj && typeof obj.name === 'string' ? obj.name : 'noname'
  //   this.text = 'text' in obj && typeof obj.text === 'string' ? obj.text : ''
  //   this.size = 'size' in obj && typeof obj.size === 'number' ? obj.size : 12
  //   this.color =
  //     'color' in obj && 'foreground' in obj.color && 'background' in obj.color
  //       ? obj.color
  //       : { foreground: 'black', background: 'transition' }
  //   this.font =
  //     'font' in obj && typeof obj.font === 'string' ? obj.font : 'Arial'
  //   this.style =
  //     'style' in obj && 'bold' in obj.style && 'italic' in obj.style
  //       ? obj.style
  //       : {
  //           bold: false,
  //           italic: false,
  //         }
  //   this.line =
  //     'line' in obj &&
  //     'over' in obj.line &&
  //     'through' in obj.line &&
  //     'under' in obj.line
  //       ? obj.line
  //       : {
  //           over: false,
  //           through: false,
  //           under: false,
  //         }

  //   this.permanent =
  //     'permanent' in obj && typeof obj.permanent === 'boolean'
  //       ? obj.permanent
  //       : false
  //   return this
  // }
}

export function SketchTextDataDefault(): SketchTextData {
  return new SketchTextData().loadFromJSON(`{
  "name": "New Text",
  "maxWidth":0,
  "text": "New Text Here...",
  "size": 14,
  "color": {"background":"#00000000","foreground":"#FFFFFF"},
  "font":"Arial",
  "style":{
    "bold": false,
    "italic": false
  },
  "align":{
    "left":true,
    "center":false,
    "justify":false,
    "right":false
  },
  "line":{
    "over": false,
    "through": false,
    "under": false
  },
  "permanent": true
}
`);
}

export interface ImageSource {
  type: "none" | "url" | "store";
  sourceStr: string;
}

export class SketchImageData extends InterObjectData {
  subname: string = "sketchImage";
  source!: ImageSource;
  dim!: {
    resizeMode: {
      none: boolean;
      both: boolean;
      h: boolean;
      v: boolean;
    };
    width: number;
    height: number;
  };
  radius!: number;
  flip!: {
    h: boolean;
    v: boolean;
  };
}
export function SketchImageDataDefault(): SketchImageData {
  return new SketchImageData().loadFromJSON(`{
  "name": "New Image",
  "source":{
    "type": "url",
    "sourceStr":"https://agirls.aottercdn.com/media/c425be65-cf16-4fc2-9e61-c552ff2ce0e8.jpg"
  },
  "dim": {
    "resizeMode": {
      "none" : false,
      "both" : true,
      "h" : false,
      "v" : false
    },
    "width": 400,
    "height": 200
  },
  "radius": 0,
  "flip":{
    "h" : false,
    "v" : false
  }
}
`);
}

export class SketchIconData extends InterObjectData {
  subname: string = "sketchIcon";
  icon!: string;
  size!: number;
  color!: string;
}
export function SketchIconDataDefault(): SketchIconData {
  return new SketchIconData().loadFromJSON(`{
  "name": "New Icon",
  "icon": "MdEmojiEmotions",
  "size": 45,
  "color": "white"
}
`);
}

export class SketchLinkData extends InterObjectData {
  subname: string = "sketchLink";
  link!: string;
  size!: number;
  simple!: boolean;
  image!: boolean;
  description!: boolean;
}

export function SketchLinkDataDefault(): SketchLinkData {
  return new SketchLinkData().loadFromJSON(`{
  "name": "New Link",
  "link": "https://mail.google.com/",
  "size": 12,
  "simple": false,
  "image": true,
  "description": true
}
`);
}

export class SketchRegionData extends InterObjectData {
  subname: string = "sketchRegion";
  dim!: {
    resizeMode: {
      none: boolean;
      both: boolean;
      h: boolean;
      v: boolean;
    };
    width: number;
    height: number;
  };
  radius!: number;
  thick!: number;
  style!: {
    solid: boolean;
    dashed: boolean;
    dotted: boolean;
    double: boolean;
  };
  bgColor!: string
  borderColor!: string
}
export function SketchRegionDataDefault(): SketchRegionData {
  return new SketchRegionData().loadFromJSON(`{
  "name": "New Region",
  "dim": {
    "resizeMode": {
      "none" : false,
      "both" : true,
      "h" : false,
      "v" : false
    },
    "width": 400,
    "height": 200
  },
  "radius": 5,
  "style": {
    "solid" : true,
    "dashed" : false,
    "dotted" : false,
    "double" : false
  },
  "thick": 4,
  "bgColor": "transparent",
  "borderColor": "white"
}
`);
}

export class SketchLinearLayoutData extends InterObjectData {
  subname: string = "SketchLinearLayout";
  dim!: {
    resizeMode: {
      none: boolean;
      both: boolean;
      h: boolean;
      v: boolean;
    };
    width: number;
    height: number;
  };
  radius!: number;
  thick!: number;
  style!: {
    solid: boolean;
    dashed: boolean;
    dotted: boolean;
    double: boolean;
  };
  align!: {
    vertical: boolean;
    horizontal: boolean;
  };
  bgColor!: string
  borderColor!: string
  members!: string[]
}
export function SketchLinearLayoutDataDefault(): SketchLinearLayoutData {
  return new SketchLinearLayoutData().loadFromJSON(`{
  "name": "New Linear Layout",
  "dim": {
    "resizeMode": {
      "none" : false,
      "both" : true,
      "h" : false,
      "v" : false
    },
    "width": 400,
    "height": 200
  },
  "radius": 5,
  "style": {
    "solid" : true,
    "dashed" : false,
    "dotted" : false,
    "double" : false
  },
  "thick": 4,
  "bgColor": "transparent",
  "borderColor": "white",
  "align": {
    "vertical": false,
    "horizontal": true
  },
  "members":[]
}
`);
}

export class BlockTextData extends InterObjectData {
  subname: string = "blockText";
  maxWidth!: number;
  text!: string;
  input(args: any[]) {
    this.text = args[0]
      .toString()
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }
  output(): any[] {
    return [this.text];
  }
  passive() {
    return this.ports.in[0];
  }
}

export function BlockTextDataDefault(): BlockTextData {
  return new BlockTextData().loadFromJSON(`{
  "name": "New Block Text",
  "maxWidth": 180,
  "text":"input something..."
}
`);
}

export class BlockRTFData extends InterObjectData {
  subname: string = "blockRTF";
  maxWidth!: number;
  content!: string;
  size!: number;
  input(args: any[]) {
    this.content = args[0];
  }
  output(): any[] {
    return [this.content];
  }
  passive() {
    return this.ports.in[0];
  }
}

export function BlockRTFDataDefault(): BlockRTFData {
  return new BlockRTFData().loadFromJSON(`{
  "name": "New Block RTF",
  "maxWidth": 500,
  "content":"input something...",
  "size": 12
}
`);
}

export class ProcessorTextCountData extends InterObjectData {
  name: string = "Text Count Processor";
  subname: string = "processorTextCount";
  text: string = "";
  input(args: any[]) {
    this.text = JSON.stringify(args[0]);
  }
  output(): any[] {
    return [
      this.text.length,
      this.text.split(" ").filter((w) => w !== " " && w !== "").length,
    ];
  }
  passive() {
    return this.ports.in[0];
  }
}

export class ProcessorConcatData extends InterObjectData {
  name: string = "Concat Processor";
  subname: string = "processorConcat";
  text1: string = "";
  text2: string = "";
  delimiter: string = "";
  input(args: any[]) {
    this.text1 = args[0] || "";
    this.text2 = args[1] || "";
  }
  output(): any[] {
    return [this.text1 + this.delimiter + this.text2];
  }
  nameRender() {
    return this.delimiter ? `Concat with "${this.delimiter}"` : "Concat";
  }
}

export class ProcessorArrayData extends InterObjectData {
  name: string = "Array Processor";
  subname: string = "processorArray";
  count: number = 3;
  array: any[] = [];
  input(args: any[]) {
    this.array = args;
  }
  output(): any[] {
    return [[...this.array]];
  }
  nameRender() {
    return `Array[${Math.max(this.count, 1)}]`;
  }
  dynamicPorts(): {
    inputs: { title: string }[];
    outputs: { title: string }[];
  } {
    return {
      inputs: Array.from(Array(Math.max(this.count, 1)).keys()).map((key) => ({
        title: `Obj${key + 1}`,
      })),
      outputs: [{ title: `Array[${Math.max(this.count, 1)}]` }],
    };
  }
}

export class ProcessorJoinData extends InterObjectData {
  name: string = "Join Processor";
  subname: string = "processorJoin";
  delimiter: string = "";
  array: any[] = [];
  input(args: any[]) {
    this.array = args[0];
  }
  output(): any[] {
    return [this.array.join(this.delimiter)];
  }
  nameRender() {
    return this.delimiter ? `Join with "${this.delimiter}"` : "Join";
  }
}

export class ProcessorSplitData extends InterObjectData {
  name: string = "Split Processor";
  subname: string = "processorSplit";
  delimiter: string = "";
  text: string = "";
  input(args: any[]) {
    this.text = args[0];
  }
  output(): any[] {
    return [this.text.split(this.delimiter)];
  }
  nameRender() {
    return `Split with "${this.delimiter}"`;
  }
}
