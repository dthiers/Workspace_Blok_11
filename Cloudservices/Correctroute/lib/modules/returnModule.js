
module.exports = function(req, res, next){
  res.isHTML = function(){
    return (req.query.format = 'html') || (req.headers['content-type'] = 'text/html');
  }

  var returnFormatByHeader = function(formats){
    switch(req.headers['content-type']){
      case 'application/json'       :
      case 'json'                   : return formats.json();
      case 'text/html'              :
      case 'html'                   :
      case 'application/xhtml+xml'  :
      case 'undefined'              :
      default                       : return formats.html();
    }
  }
  var returnFormat = function(formats){
    // TODO: over de formats loopen
    switch (req.query.format){
      case 'html'     : return formats.html();
      case undefined  : return formats.html();
      case 'json'     : return formats.json();
      default         : return formats.default();
    }
  }

  res.return = function(result){
    returnFormat({
      html: function(){
        console.log('html is returned');
        if(result.data){
          res.render(result.view, result.data);
        } else {
          res.json({ "message": "unable to render" });
        }
      },
      json: function(){
        console.log('json is returned');
        res.json(result.data);
      },
      default: function(){
        console.log('unsupported');
        res.json({ "message": "unable to poop out format" });
      }
    })
  }

  res.error = function(statusCode, message){
    returFormat({
      html: function(){
        res.render('error', message)
      },
      json: function(){
        res.statusCode(statusCode).json({ error: message });
      }
    })
  }

  next();
}
