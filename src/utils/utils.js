const FindAllValuesInString = function(arr, val) {
  let indexes = [];
  let i = -1;
  while ((i = arr.indexOf(val, i + 1)) !== -1){
    indexes.push(i);
  }
  return indexes;
};

const AddLinkstoAtSymbols = function(text) {
  let numAtSymbols = FindAllValuesInString(text, '@');
  if (numAtSymbols.length === 0) {
    return text;
  }

  let counter, endIdx, username, login, url;
  numAtSymbols.forEach(startIdx => {
    counter = startIdx + 1;
    endIdx = -1;
    while (endIdx === -1) {
      if (text[counter].match(/[a-z]/i) === null) {
        endIdx = counter;
      }
      counter += 1;
    }
    username = text.substring(startIdx, endIdx);
    login = username.substring(1);
    url = `[${username}](https://github.com/${login})`;
    text = text.substr(0, startIdx) + url + text.substr(endIdx);
  });

  return text;
};

exports.AddLinkstoAtSymbols = AddLinkstoAtSymbols;
exports.FindAllValuesInString = FindAllValuesInString;
