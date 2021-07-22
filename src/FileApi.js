export class FileApi {

    constructor(file, { batch_lines  }) {
        this.fileReader = new FileReader();
        this.textDecoder = new TextDecoder();

        this.file = file;
        this.lineCount = 0;
        this.processedLines = 0;
        this.offset = 0;
        
        this.chunkLines = [];
        this.readedLines = [];

        this.CHUNK_SIZE = 500000; // 500kb
        this.BATCH_SIZE = batch_lines || 50; // lines

        this.fileReader.onload = () => this.onLoad();
        this.fileReader.onerror = () => this.onError();

        this.readLines();
    }

    onLoad() {
        let results = this.textDecoder.decode(this.fileReader.result, { stream: true });
        let lines = results.split('\n');
        this.results = lines.pop();
        this.lineCount += lines.length;
        this.readedLines = this.readedLines.concat(lines);
        
        this.splitChunks();
        this.readLines();
    }

    readLines() {
        if (this.offset !== 0 && this.offset >= this.file.size) {
            this.onComplete();
            return;
        }
        let slice = this.file.slice(this.offset, this.offset + this.CHUNK_SIZE);
        this.fileReader.readAsArrayBuffer(slice);
        this.offset += this.CHUNK_SIZE;
    }

    splitChunks() {
        let offset = 0;
        let chunkLines = []
        while (offset + this.BATCH_SIZE <= this.readedLines.length) {
            chunkLines = this.readedLines.slice(offset, offset += this.BATCH_SIZE);
            this.onChunkLines(chunkLines);
        }
        this.readedLines = this.readedLines.slice(offset, offset + this.BATCH_SIZE);
    }

    onChunkLines(chunk) {
        this.processedLines += chunk.length;
    }

    onError() {
        this.onComplete(this.fileReader.error);
    }

    onComplete() {
        this.onChunkLines(this.readedLines);

        console.log('Processed ' + this.processedLines);
        console.log('Total ' + this.lineCount)
    }
}