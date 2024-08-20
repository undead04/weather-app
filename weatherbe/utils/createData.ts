import * as fs from 'fs';
import State from '../models/state';
import County from '../models/county';
import { join } from 'path';
import { IAddress } from '../types/types';
import { normalizeString } from './removeAccents';
export const createData = async (): Promise<void> => {
    // Kiểm tra nếu dữ liệu đã tồn tại trong database
    const existingCounties: number = await County.countDocuments();
    const existingState: number = await State.countDocuments();
    const filePath=join(__dirname,"..","data","Vietnam.json")
    if (existingCounties > 0 && existingState > 0) {
        console.log("Database đã tồn tại");
        return;
    }
    const jsonData:IAddress[]=await readJsonFile(filePath)
   // Tạo mảng thao tác bulk cho State
   const stateBulkOps: any[] = [];
   const countyBulkOps: any[] = [];
   for (let i = 0; i < jsonData.length; i++) {
       const state: string = normalizeString(jsonData[i].state)
       stateBulkOps.push({
           updateOne: {
               filter: { name: state },
               update: { $setOnInsert: { name: state } },
               upsert: true,
           }
       });
   }
   // Thực hiện bulkWrite cho State
   await State.bulkWrite(stateBulkOps);
   // Tạo map cho state để lấy _id
   const stateMap: { [key: string]: string } = await State.find({}).then(states => {
       return states.reduce((map, state) => {
           map[`${state.name}`] = state._id;
           return map;
       }, {} as { [key: string]: string });
   });
   for (let i = 0; i < jsonData.length; i++) {
       const county: string = normalizeString(jsonData[i].county);
       const state: string = normalizeString(jsonData[i].state);
       const stateId: string | undefined = stateMap[state];
       countyBulkOps.push({
           insertOne: {
               document: {
                   name: county,
                   state: stateId
               }
           }
       });
   }
   // Thực hiện bulkWrite cho County
   await County.bulkWrite(countyBulkOps);
   console.log("Hoàn thành nạp dữ liệu");
    
};
const readJsonFile = (filePath: string): Promise<IAddress[]> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  };
