 type Toast={key:Symbol,message:string}
type ToastMessage={message:string}
export default reactive({
  items:[
       
    ] as Array<Toast>,
    
 remove(index: number ){
       
        this.items.splice(index,1) 
    },
  add(toast: ToastMessage){
        console.log('insed toasts')
        this.items.unshift({
            key:Symbol(),
            ...toast,
        })
    }

   
})