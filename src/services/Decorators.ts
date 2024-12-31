import { createElLoading } from '@/components/loading/index'
import  {type Ref ,ref} from 'vue'

export function StoreCache(dataR: Ref<any>, replace = false) {
  return (_: any, __: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async (...args: any[]) => {
      const val = dataR.value
      console.log(Object.prototype.toString.call(val));
      
      if (
        !replace &&
        (Object.prototype.toString.call(val) === '[object Array]' ||
          Object.prototype.toString.call(val) === '[object Object]')
      ) {
        return Promise.resolve(dataR)
      }
      const r = await originalMethod.apply(descriptor, args)
      return (dataR.value = r) && dataR
    }
    return descriptor
  }
}


export function StoreMapCache(dataR: Ref<Map<any, any>>, indexs?: number[]) {
  return (_: any, __: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async (...args: any[]) => {
      const val = dataR.value      
      //修饰方法的参数或者部分参数的index，作为键
      let mapKey = args.join('-')
      if (indexs) {
        const temp = []
        for (const index of indexs) {
          //参数值重新压入新数组
          temp.push(args[index])
        }
        mapKey = temp.join('-')
      }
      const mapValue = val.get(mapKey) 
      if (Object.prototype.toString.call(val) === '[object Map]' && mapValue) {
        // console.log('map-descriptor-store-get')
        return Promise.resolve(mapValue)
      }
      // console.log('map-descriptor-useGet-get')
      const r = await originalMethod.apply(descriptor, args)
      const refR = ref(r) // 将结果转换为 Ref
      val.set(mapKey, refR)  
      console.log(val.get(mapKey));
          
      return val.get(mapKey)
    }
    return descriptor
  }
}


export function StoreClear(...clears: Function[]) {
  return (_: any, __: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = (...args: any[]) => {
      for (const clear of clears) {
        clear()
      }
      return originalMethod.apply(descriptor, args)
    }
    return descriptor
  }
}

export function ELLoading() {
  return (_: any, __: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async (...args: any[]) => {
      let r
      const loading = createElLoading()
      try {
        r = await originalMethod.apply(descriptor, args)
      } finally {
        loading.close()
      }
      return r
    }
    return descriptor
  }
}
