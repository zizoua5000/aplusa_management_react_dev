import React, { useRef } from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import ReactToPrint , { PrintContextConsumer }from "react-to-print";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { getQaimeItem } from '../../redux/Reducers/qaimeList_reducer';
import { getIsFetching,getSetErrorMessage,getQaimeItemSel} from '../../redux/Selectors/qaimeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'
import classes from '../../custom/qaime_print.module.css'

let QaimePrintContainer = ({data}) => {
    const componentRef = useRef();
    return (
      <div className={classes.nnnn}>
        <ReactToPrint
          trigger={() => <button className="btn btn-primary aa_create_trip" style={{marginBottom:"10px"}}>Print Qaime</button>}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>
            <ComponentToPrint data={data} ref={componentRef} />
        </div>
      </div>
    );
};

class ComponentToPrint extends React.Component {
    render() {
      return (
        <QaimePrintItem qaimePrintItem={this.props.data} />
      );
    }
}

let QaimePrintItem = ({ qaimePrintItem }) => {
    return (
        <table style={{ width: "100%" }} border="0" cellPadding="0" cellSpacing="0" id="sheet0" className={classes.sheet0 +" "+classes.gridlines}>
            {/* <col className={classes.col0}></col>
            <col className={classes.col1}></col>
            <col className={classes.col2}></col>
            <col className={classes.col3}></col> */}
            <tbody>
                <tr className={classes.row0}>
                    {qaimePrintItem.qaime_type==1 &&
                         <td className={classes.column0+" "+ classes.style34+" "+ classes.s+" "+ classes.style35} colSpan="3">Biz aşağıda imza edənlər siyahıda verilən malların anbardan xaric olunmasını xahiş edirik:</td>
                    }
                    {qaimePrintItem.qaime_type==2 &&
                         <td className={classes.column0+" "+ classes.style34+" "+ classes.s+" "+ classes.style35} colSpan="3">Biz aşağıda imza edənlər siyahıda verilən malların anbara qaytarılmasını xahiş edirik:</td>
                    }
                    <td className={classes.column3+" "+ classes.style3 +" "+classes.null}></td>
                </tr>
                <tr className={classes.row1}>
                    <td className={classes.column0+" "+classes.style5+" "+classes.null}></td>
                    <td className={classes.column1+" "+classes.style6+" "+ classes.null}></td>
                    <td className={classes.column2+" "+classes.style6 +" "+classes.null}></td>
                    <td className={classes.column3+" "+classes.style7 +" "+classes.null}></td>
                </tr>
                <tr className={classes.row2}>
                    <td className={classes.column0+" "+ classes.style9+" "+ classes.s}>
                        {qaimePrintItem.responsible_person_detail.department_chief_detail.first_name} {qaimePrintItem.responsible_person_detail.department_chief_detail.last_name}
                        / {qaimePrintItem.responsible_person_detail.chief_substitute_detail.first_name} {qaimePrintItem.responsible_person_detail.chief_substitute_detail.last_name}
                    </td>
                    <td className={classes.column1+" "+ classes.style10+" "+ classes.null}></td>
                    <td className={classes.column2+" "+ classes.style11+" "+ classes.s}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/             </td>
                    <td className={classes.column3+" "+ classes.style7+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row3}>
                    <td className={classes.column0+" "+ classes.style12+" "+ classes.null}></td>
                    <td className={classes.column1+" "+ classes.style6+" "+ classes.null}></td>
                    <td className={classes.column2+" "+ classes.style6+" "+ classes.null}></td>
                    <td className={classes.column3+" "+ classes.style7+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row4}>
                    <td className={classes.column0+" "+ classes.style9+" "+ classes.s}>
                        {qaimePrintItem.responsible_person_detail.accounter_detail.first_name} {qaimePrintItem.responsible_person_detail.accounter_detail.last_name}
                    </td>
                    <td className={classes.column1+" "+ classes.style11+" "+ classes.null}></td>
                    <td className={classes.column2+" "+ classes.style13+" "+ classes.null}></td>
                    <td className={classes.column3+" "+ classes.style7+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row5}>
                    <td className={classes.column0+" "+ classes.style14+" "+ classes.null}></td>
                    <td className={classes.column1+" "+ classes.style6+" "+ classes.null}></td>
                    <td className={classes.column2+" "+ classes.style6+" "+ classes.null}></td>
                    <td className={classes.column3+" "+ classes.style8+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row6}>
                    {qaimePrintItem.qaime_type==1 &&
                        <td className={classes.column0+" "+ classes.style36+" "+ classes.s+" "+ classes.style36} colSpan="3">ANBARDAN MALLARIN XARİC OLUNMASI  № {qaimePrintItem.name}</td>
                    }
                    {qaimePrintItem.qaime_type==2 &&
                        <td className={classes.column0+" "+ classes.style36+" "+ classes.s+" "+ classes.style36} colSpan="3">ANBARA MALLARIN QAYTARILMASI  № {qaimePrintItem.name}</td>
                    }
                    <td className={classes.column3+" "+ classes.style8+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row7}>
                    <td className={classes.column0+" "+ classes.style15+" "+ classes.null}></td>
                    <td className={classes.column1+" "+ classes.style16+" "+ classes.null}></td>
                    <td className={classes.column2+" "+ classes.style16+" "+ classes.null}></td>
                    <td className={classes.column3+" "+ classes.style8+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row8}>
                    <td className={classes.column0+" "+ classes.style37+" "+ classes.s+" "+ classes.style37} colSpan="2">Yazılma tarixi</td>
                    <td className={classes.column2+" "+ classes.style32+" "+ classes.s}>&nbsp;&nbsp;&nbsp;{qaimePrintItem.qaime_datetime}</td>
                    <td className={classes.column3+" "+ classes.style8+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row9}>
                    <td className={classes.column0+" "+ classes.style17+" "+ classes.null}></td>
                    <td className={classes.column1+" "+ classes.style18+" "+ classes.null}></td>
                    <td className={classes.column2+" "+ classes.style18+" "+ classes.null}></td>
                    <td className={classes.column3+" "+ classes.style31+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row10}>
                    <td className={classes.column0+" "+ classes.style19+" "+ classes.s}>Malın Adı</td>
                    <td className={classes.column1+" "+ classes.style20+" "+ classes.s}>Miqdar</td>
                    <td className={classes.column2+" "+ classes.style20+" "+ classes.s}>Şirkətin adı</td>
                    {qaimePrintItem.qaime_type==1 &&
                        <td className={classes.column3+" "+ classes.style21+" "+ classes.s}>Satılır</td>
                    }
                    {qaimePrintItem.qaime_type==2 &&
                        <td className={classes.column3+" "+ classes.style21+" "+ classes.s}>1/2</td>
                    } 
                </tr>
                
                {qaimePrintItem.qaime_details_detail.map((item, key) => <QaimeDetailPrintItem qaimeDetailPrintItem={item} qaimeType={qaimePrintItem.qaime_type} key={key}/>)}

                <tr className={classes.row28}>
                    <td className={classes.column0+" "+ classes.style29+" "+ classes.null}></td>
                    <td className={classes.column1+" "+ classes.style30+" "+ classes.null}></td>
                    <td className={classes.column2+" "+ classes.style30+" "+ classes.null}></td>
                    <td className={classes.column3+" "+ classes.style30+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row29}>
                    <td className={classes.column0+" "+ classes.style33+" "+ classes.s+" "+ classes.style33} colSpan="2">&nbsp;&nbsp;Təhvil Verdi  </td>
                    {qaimePrintItem.qaime_type==1 &&
                        <td className={classes.column2+" "+ classes.style11+" "+ classes.s}>&nbsp;&nbsp;&nbsp;
                            {qaimePrintItem.responsible_person_detail.provider_detail.first_name} {qaimePrintItem.responsible_person_detail.provider_detail.last_name}      
                        </td>
                    }
                    {qaimePrintItem.qaime_type==2 &&
                         <td className={classes.column2+" "+ classes.style11+" "+ classes.s}>&nbsp;&nbsp;&nbsp;
                            {qaimePrintItem.responsible_person_detail.recipient_detail.first_name} {qaimePrintItem.responsible_person_detail.recipient_detail.last_name}      
                         </td>
                    }
                    <td className={classes.column3+" "+ classes.style11+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row30}>
                    <td className={classes.column0+" "+ classes.style14+" "+ classes.null}></td>
                    <td className={classes.column1+" "+ classes.style8+" "+ classes.null}></td>
                    <td className={classes.column2+" "+ classes.style30+" "+ classes.null}></td>
                    <td className={classes.column3+" "+ classes.style30+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row31}>
                    <td className={classes.column0+" "+ classes.style33+" "+ classes.s+" "+ classes.style33} colSpan="2">Təhvil Aldı  </td>
                    {qaimePrintItem.qaime_type==1 &&
                        <td className={classes.column2+" "+ classes.style11+" "+ classes.s}>&nbsp;&nbsp;&nbsp;
                            {qaimePrintItem.responsible_person_detail.recipient_detail.first_name} {qaimePrintItem.responsible_person_detail.recipient_detail.last_name}      
                        </td>
                    }
                    {qaimePrintItem.qaime_type==2 &&
                        <td className={classes.column2+" "+ classes.style11+" "+ classes.s}>&nbsp;&nbsp;&nbsp;
                            {qaimePrintItem.responsible_person_detail.provider_detail.first_name} {qaimePrintItem.responsible_person_detail.provider_detail.last_name}      
                        </td>
                    }
                    <td className={classes.column3+" "+ classes.style11+" "+ classes.null}></td>
                </tr>
                <tr className={classes.row32}>
                    <td className={classes.column0+" "+ classes.style14+" "+ classes.null}></td>
                    <td className={classes.column1+" "+ classes.style8+" "+ classes.null}></td>
                    <td className={classes.column2+" "+ classes.style30+" "+ classes.null}></td>
                    <td className={classes.column3+" "+ classes.style30+" "+ classes.null}></td>
                </tr>
            </tbody>
        </table>
    )
}


let QaimeDetailPrintItem = ({ qaimeDetailPrintItem, qaimeType }) => {
    return (
        <>
        {qaimeDetailPrintItem.device!=null &&
            <tr className={classes.row11}>
                <td className={classes.column0+" "+ classes.style27+" "+ classes.s}>
                    {qaimeDetailPrintItem.device_detail.device_model_detail.device_mark_detail.name},   
                    {qaimeDetailPrintItem.device_detail.device_model_detail.name}, 
                    {qaimeDetailPrintItem.device_detail.serie} 
                </td>
                <td className={classes.column1+" "+ classes.style27+" "+ classes.n}>{qaimeDetailPrintItem.count}</td>
                <td className={classes.column2+" "+ classes.style27+" "+ classes.s}>{qaimeDetailPrintItem.company_detail.name}</td>
                {qaimeType==1 &&
                    <td className={classes.column3+" "+ classes.style22+" "+ classes.s}>+</td>
                }
                {qaimeType==2 &&
                    <td className={classes.column3+" "+ classes.style22+" "+ classes.s}></td>
                }
            </tr>
        }
        {qaimeDetailPrintItem.accessory!=null &&
            <tr className={classes.row11}>
                <td className={classes.column0+" "+ classes.style27+" "+ classes.s}>
                    {qaimeDetailPrintItem.accessory_detail.name} 
                </td>
                <td className={classes.column1+" "+ classes.style27+" "+ classes.n}>{qaimeDetailPrintItem.count}</td>
                <td className={classes.column2+" "+ classes.style27+" "+ classes.s}>{qaimeDetailPrintItem.company_detail.name}</td>
                {qaimeType==1 &&
                    <td className={classes.column3+" "+ classes.style22+" "+ classes.s}>+</td>
                }
                {qaimeType==2 &&
                    <td className={classes.column3+" "+ classes.style22+" "+ classes.s}></td>
                }
            </tr>
        }
        </>
    )
}

export default QaimePrintContainer;