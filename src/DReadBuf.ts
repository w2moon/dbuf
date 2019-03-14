
export default class DReadBuf{
    private buf:Buffer;
    private offset:number;
    constructor(buf:Buffer){
        this.buf = buf;
        this.offset = 0;
    }
    readBool(){
        let v = this.buf.readInt8(this.offset)?true:false;
        this.offset += 1;
        return v;
    }

    readInt32(){
        let v = this.buf.readInt32LE(this.offset);
        this.offset += 4;
        return v;
    }

    readFloat32(){
        let v = this.buf.readFloatLE(this.offset);
        this.offset += 4;
        return v;
    }

    
    readString(){
        let len = this.readInt32();
        let tmp = this.buf.toString("utf8",this.offset,this.offset+len);
        this.offset += len;
        return tmp;

    }

    

    readBuffer(){
        let len = this.readInt32();
        let tmp = Buffer.allocUnsafe(len);Buffer.from(this.buf,this.offset,len);
        this.buf.copy(tmp,0,this.offset,this.offset+len);
        this.offset += len;
        return tmp;
    }
}