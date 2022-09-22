export default function urltoFile(url:any, filename:any, ){
    let mimeType = (url.match(/^data:([^;]+);/)||'')[1];
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){
          return new File([buf], filename, {type:mimeType});
        })
    );
  }
