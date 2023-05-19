 type Toast={key:Symbol,message:string,type:ToastType}
type ToastMessage={message:string,type:ToastType}

export enum ToastType{
  info="info",
  success="success",
  warning ="warning",
  error="error"
}
export default reactive({
  
  items:[
       
    ] as Array<Toast>,
    
 remove(index: number ){
       
        this.items.splice(index,1) 
    },
  add(toast: ToastMessage){
        
        this.items.unshift({
            key:Symbol(),
            ...toast,
        })
    }

   
})