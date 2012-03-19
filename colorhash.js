var printColors = module.exports.printColors = function(stream,hashed){
  var colors = hashed.match(/.{1,2}/g);

  for (var i in colors) 
    stream.write("\033[48;5;"+parseInt(colors[i],16)+"m  ");
  stream.write("\033[0m\n");
};

module.exports.printColorsTerm = function(input,alg){
  var parse = function(err, data){
    require('./colorhash.js')
      .printColors( 
          process.stdout, 
          require('cryptojs').Crypto[alg](err ? input : data)
      );
  };

  require('fs').readFile(input,parse);
}; 
