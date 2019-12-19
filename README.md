# dbuf



let wb = new DWriteBuf();
wb.writeString("fdfd");
let buf = wb.toBuffer();

let rb = new DReadBuf(buf);
rb.readString();
然后可以按类型读取buf内容，buf应该用DWriteBuf生成,
读的顺序必须和写的顺序一致