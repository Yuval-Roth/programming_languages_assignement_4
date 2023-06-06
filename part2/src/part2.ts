// PPL 2023 HW4 Part2

// Q 2.1 

// Specify the return type.
export const delayedSum = (a: number, b: number, delay: number) : Promise<number> => 
    new Promise<number>((resolve , reject) => delay < 0 ?
        reject("negative delay") :
        setTimeout(()=>{resolve(a+b)},delay))  
    
export const testDelayedSum = () => {
    const time: number = Date.now()

    delayedSum(2,4,-10).then((result : number) => {
        if(Date.now() - time >= 1000)
            console.log("1000 ms failed to fail successfully") // this is good
        else
            console.log("1000 ms failed !!!!! *surprised_pikachu_face.png*") // this is not so good (but we do not discriminate)

        if(result != 6)
            console.log("person 1: '2 plus 4 is not 6', person 2(slightly fat): 'OH NO! anyway....'") // this is as mild inconvenience 
        else
            console.log("2 + 4 == 6 es verdad! tan maravilioso, tan bonito!!!!!") // MUM CAN I HAZ DIS? 
    }).catch((error : string) => console.log("error: "+ error))
}
 

// Q 2.2

// Values returned by API calls.
export type Post = {
    userId: number
    id: number
    title: string
    body: string
}

// When invoking fetchData(postsUrl) you obtain an Array Post[]
// To obtain an array of posts
export const postsUrl = 'https://jsonplaceholder.typicode.com/posts'; 

// Append the desired post id.
export const postUrl = 'https://jsonplaceholder.typicode.com/posts/'; 

// When invoking fetchData(invalidUrl) you obtain an error
export const invalidUrl = 'https://jsonplaceholder.typicode.com/invalid';

// Depending on the url - fetchData can return either an array of Post[] or a single Post.
// Specify the return type without using any.
export const fetchData = async (url: string) : Promise<Post | Post[]> =>{
    return fetch(url,undefined)
            .then((response : Response) => response.json()
                        .then((values : Post | Post[]) => values)
                        .catch((error) => error))
            .catch((error) => error)
}

export const isPost = (x: Post | Post[]) : x is Post => ! Array.isArray(x) 
export const isPostArray = (x: Post | Post[]) : x is Post[] => Array.isArray(x) 

export const testFetchData = () => {
    fetchData(postUrl + 80)
        .then((x:Post| Post[]) => {
            if(isPost(x)){
                if(x.userId === 80)
                    console.log("single post success")
                else
                console.log("single post fail")
            }
            else
                console.log("single post fail")
        }).catch(()=>console.log("single post fail"))

    fetchData(postsUrl)
        .then((x:Post| Post[]) => {
            if(isPostArray(x)){
                if(x.length === 100)
                    console.log("post array success")
                else
                console.log("post array fail")
            }
            else
                console.log("post array fail")
        }).catch(()=>console.log("post array fail"))

    fetchData(invalidUrl)
        .then(() =>console.log("invalid url fail"))
        .catch(()=>console.log("invalid url success")) 
}

// Q 2.3

// Specify the return type.
export const fetchMultipleUrls = async (urls: string[]) : Promise<Post[]> => {
    let arr : Promise<Post[]>[] = []
    urls.forEach((url:string)=> {
        arr.push(
            fetch(url,undefined)
                .then((response : Response) => 
                    response.json()
                        .then((values : Post | Post[]) => {
                            if(isPost(values)){
                                return [values]
                            } else {
                                return values
                            }
                        })
                        .catch((error) => error))
                .catch((error) => error)
        )
    })
    return Promise.all(arr).then((pArr : Post[][]) => ([] as Post[]).concat(... pArr))
}
    
export const testFetchMultipleUrls = () => {
    let urls : string[] = Array()
    for(let i = 1; i <=20 ; i++){
        urls.push(postUrl+i)
    }
    fetchMultipleUrls(urls).then((posts: Post[]) =>{
        if(posts.length === 20){
            let i = 1
            posts.forEach((post:Post) => {
                if(post.id != i++) {
                    throw Error("fetch multiple urls fail")
                }
            })
            console.log("fetch multiple urls pass")
        } else {
            console.log("fetch multiple urls fail")
        }
    }).catch(()=>console.log("fetch multiple urls fail"))
}
