import React from 'react';
import { Modal } from '../Common/Modal/Modal';
import AccessoryHistoryItem from './AccessoryHistoryItem'

let AccessoryHistoryModal = ({accessoryHistoryListById,currentPage, pageSize,closeModal})=> {
  let itemCount = ((currentPage - 1) * pageSize) + 1
        console.log("ACCESSORY HISTORY MODAL ")
      return(
        <div >
          <Modal closeModal={closeModal}>
          <form>
            <div className="table-responsive"> 
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th>Add Count</th>
                        <th>Rated Price</th>
                        <th>Entry Watehouse Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {accessoryHistoryListById.map((item, key) => <AccessoryHistoryItem accessoryHistoryItem={item} itemCount={itemCount++} key={key}/>)}
                </tbody>

                </table>
            </div>
        </form>
        </Modal>
        </div>

      )
    }
  

  export default AccessoryHistoryModal