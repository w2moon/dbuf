import {expect} from "chai";
import DWriteBuf from "../src/DWriteBuf";
import DReadBuf from "../src/DReadBuf";
  
function expectFloatEqual(v:number,dst:number){
    expect(v).to.be.within(dst-0.001,dst+0.001);
}

describe("测试",()=>{
    it('测试普通buf',()=>{
        let b = new Buffer(4);
        b.writeFloatLE(1.2,0);
        expect(b.readFloatLE(0)).to.be.within(1.199,1.2111);
    });
    it('测试普通String',()=>{
        let b = Buffer.allocUnsafe(32);
        let str = "hello";
        let n = b.write(str,"binary");
        let len = str.length;
        expect(n).equal(len);
        expect(b.toString("binary",0,len)).equal(str);
    });
    it('测试Bool',()=>{
        let wb = new DWriteBuf();
 
        wb.writeBool(true);
        wb.writeBool(false);
        wb.writeBool(true);
 
        let rb = new DReadBuf(wb.toBuffer());
 
        expect(rb.readBool()).equal(true);
        expect(rb.readBool()).equal(false);
        expect(rb.readBool()).equal(true);
     });

     it('测试String',()=>{
        let wb = new DWriteBuf();
 
        wb.writeString("hello");
        wb.writeString("hi");
        wb.writeString("good");
 
        let rb = new DReadBuf(wb.toBuffer());
 
        expect(rb.readString()).equal("hello");
        expect(rb.readString()).equal("hi");
        expect(rb.readString()).equal("good");
     });
     it('测试中文String',()=>{
        let wb = new DWriteBuf();
 
        wb.writeString("我看到了");
 
        let rb = new DReadBuf(wb.toBuffer());
 
        expect(rb.readString()).equal("我看到了");
     });

     it('测试Float32',()=>{
        let wb = new DWriteBuf();
 
        wb.writeFloat32(1.2);
        wb.writeFloat32(-2.3);
        wb.writeFloat32(110.3);
 
        let rb = new DReadBuf(wb.toBuffer());
        expectFloatEqual(rb.readFloat32(),1.2);
        expectFloatEqual(rb.readFloat32(),-2.3);
        expectFloatEqual(rb.readFloat32(),110.3);
     });

     it('测试Int32',()=>{
        let wb = new DWriteBuf();
 
        wb.writeInt32(10);
        wb.writeInt32(-3);
        wb.writeInt32(110);
 
        let rb = new DReadBuf(wb.toBuffer());
 
        expect(rb.readInt32()).equal(10);
        expect(rb.readInt32()).equal(-3);
        expect(rb.readInt32()).equal(110);
     });


    it('整体测试',()=>{
       let wb = new DWriteBuf();

       wb.writeBool(true);
       wb.writeFloat32(1.23);
       wb.writeBool(false);
       wb.writeString("hello");
       wb.writeBuffer(new Buffer("abcd"));
       wb.writeString("but");
       wb.writeBuffer(new Buffer(10).fill("c"));
       wb.writeInt32(1209);
       

       let rb = new DReadBuf(wb.toBuffer());

       expect(rb.readBool()).equal(true);
       expectFloatEqual(rb.readFloat32(),1.23);
       expect(rb.readBool()).equal(false);
       expect(rb.readString()).equal("hello");
       expect(rb.readBuffer().toString()).equal("abcd");
       expect(rb.readString()).equal("but");
       expect(rb.readBuffer().length).equal(10);
       expect(rb.readInt32()).equal(1209);
    });
});