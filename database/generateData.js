const generateData = (writer, type, encoding, numRecords, createRecord, header, callback) => {
  let recordsLeft = numRecords;
  writer.write(`${header}`);
  function write() {
    let ok = true;
    do {
      recordsLeft -= 1;
      const data = createRecord(recordsLeft);
      if (recordsLeft === 0) {
        writer.write(`${data}${type === 'json' ? ']' : ''}`, encoding, callback);
      } else {
        ok = writer.write(`${data}${type === 'json' ? ',' : '\n'}`, encoding);
      }
    } while (recordsLeft > 0 && ok);
    if (recordsLeft > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

module.exports = generateData;
