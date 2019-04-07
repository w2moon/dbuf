enum ElemType{
    Bool,
    Int32,
    Float32,
    String,
    Buffer,
}

interface ElemInfo{
    v:any;
    type:ElemType;
}

export default class DWriteBuf{
    private arr:ElemInfo[];
    constructor(){
        this.arr = [];
    }
    writeBool(v:boolean){
        this.arr.push({
            v,type:ElemType.Bool
        });
    }
    writeInt32(v:number){
        this.arr.push({
            v,type:ElemType.Int32
        });
    }

    writeFloat32(v:number){
        this.arr.push({
            v,type:ElemType.Float32
        });
    }

    writeJSON(v:any){
        this.writeString(JSON.stringify(v));
    }

    
    writeString(v:string){
        this.arr.push({
            v,type:ElemType.String
        });
    }

    

    writeBuffer(v:Buffer){
        this.arr.push({
            v,type:ElemType.Buffer
        });
        
    }

    getTotalSize(){
        let size = 0;
        this.arr.map(obj=>{
            switch(obj.type){
                case ElemType.Int32:
                    size += 4;
                break;
                case ElemType.Float32:
                    size += 4;
                break;
                case ElemType.Bool:
                    size += 1;
                break;
                case ElemType.String:
                    size += 4 + Buffer.byteLength(obj.v);
                break;
                case ElemType.Buffer:
                    size += 4 + obj.v.length;
                break;
            }
        });
        return size;
    }

    toBuffer():Buffer{
        let size = this.getTotalSize();

        let buf = Buffer.allocUnsafe(size);
        let offset = 0;
        this.arr.map(obj=>{
            let v = obj.v;
            switch(obj.type){
                case ElemType.Int32:
                    offset = buf.writeInt32LE(v,offset);
                break;
                case ElemType.Float32:
                    offset = buf.writeFloatLE(v,offset);
                break;
                case ElemType.Bool:
                    offset = buf.writeInt8(v,offset);
                break;
                case ElemType.String:
                    offset = buf.writeInt32LE(Buffer.byteLength(v),offset);
                    offset += buf.write(v,offset,"utf8");
                break;
                case ElemType.Buffer:
                    offset = buf.writeInt32LE(v.length,offset);
                    offset += v.copy(buf,offset,0,v.length);
                break;
                default:
                console.log("invalid arr type",obj.type,obj.v);
            }

        });

        return buf;
    }
}