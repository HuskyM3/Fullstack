const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
   
    
    
    const s = blogs.map(p=> p.likes).reduce((n, m)=>{ 

        return (n + m)}, 0 )

        return s
}

const favoriteBlog  = (blogs) => {
    
const result = [...blogs.reduce((map, {title, author, likes}) => {
    const key = `${title}:${author}`;
    const prev = map.get(key);
    if (prev) {
        prev.likes += likes;
    } else {
        map.set(key, {title, author, likes});
    }
    return map;
}, new Map()).values()]


const mostLikes = result.reduce(
    (prev, current) => {
      return prev.likes > current.likes ? prev : current
    }
  );
      return mostLikes
}


const mostBlogs  = (blogs) => {
    
    const result = [...blogs.reduce((map, {author, blog}) => {
        const key = `${author}`;
        const prev = map.get(key);
        //console.log(prev)
       // console.log(map)
        if (prev) {
            prev.blog += 1;
        } else {
            map.set(key, {author, blog});
            map.get(key).blog = 1
        }
        return map;
    }, new Map()).values()]
    
    //console.log(result)
    
    const mostLikes = result.reduce(
        (prev, current) => {
          return prev.blog > current.blog ? prev : current
        }
      );
          return mostLikes
    }


    const mostLikes  = (blogs) => {
    
        const result = [...blogs.reduce((map, {author, likes}) => {
            const key = `${author}`;
            const prev = map.get(key);
            if (prev) {
                prev.likes += likes;
            } else {
                map.set(key, {author, likes});
            }
            return map;
        }, new Map()).values()]
        
        
        const mostLikes = result.reduce(
            (prev, current) => {
              return prev.likes > current.likes ? prev : current
            }
          );
              return mostLikes
        }


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }




