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
import classes from '../../custom/qaime_installation_act_print.module.css'

let QaimeInstallationActPrintContainer = ({data}) => {
    const componentRefInstallationAct = useRef();
    return (
      <div>
        <ReactToPrint
          trigger={() => <button className="btn btn-success aa_create_trip" style={{marginBottom:"10px"}}>Print Installation Act</button>}
          content={() => componentRefInstallationAct.current}
        />
        <div style={{ display: "none" }}>
            <ComponentToPrint data={data} ref={componentRefInstallationAct} />
        </div>
      </div>
    );
};

class ComponentToPrint extends React.Component {
    render() {
      var page=-1; 
      return (
        <div style={{ width: "100%" }}>
            <div id="sidebar">
                <div id="outline"></div>
            </div>
            <div id="page-container">
            {this.props.data.qaime_details_detail.map((item, key) => {page++; return <QaimeDetailPrintItem qaimeDetailPrintItem={item} page={page} key={key}/> })}
            {/* <QaimePrintItem qaimePrintItem={this.props.data} /> */}
            </div>
        </div>
      );
    }
}

let QaimeDetailPrintItem = ({ qaimeDetailPrintItem, page}) => {
    let today = new Date();
    let currentYear= today.getFullYear();
    let currentMonth=today.getMonth() + 1;
    let print_page=page;
    page++;
    console.log(qaimeDetailPrintItem);
    return (
        <>
        {qaimeDetailPrintItem.device!=null &&
            <div id={"pf"+print_page}  className={classes.pf+" "+ classes.w0+" "+ classes.h0} data-page-no={print_page}>
                <div className={classes.pc+" "+ classes.pc1+" "+ classes.w0+" "+ classes.h0}>
                    <img className={classes.bi+" "+ classes.x0+" "+ classes.y0+" "+ classes.w1+" "+ classes.h1} alt="" src="data:image/png;base64,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" />
                    <div className={classes.c+" "+ classes.x1+" "+ classes.y1+" "+ classes.w2+" "+ classes.h0}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x2+" "+ classes.h2+" "+ classes.y2+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        {page>1 &&
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x2+" "+ classes.h3+" "+ classes.y3page2andmore+" "+ classes.ff2+" "+ classes.fs1+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                            <b>QURAŞDIRMA AKTI</b>
                            <span className={classes.ff1+" "+ classes.fs0+" "+ classes.customtopdate}> 
                                <span className={classes._+" "+ classes._1}></span>  
                                <span className={classes._+" "+ classes._2}></span>
                                <span className={classes._+" "+ classes._2}></span>
                                <span className={classes._+" "+ classes._2}></span> 
                                <span className={classes._+" "+ classes._2}></span>  
                                <span className={classes._+" "+ classes._2}></span> 
                                <span className={classes._+" "+ classes._2}></span> 
                                <span className={classes._+" "+ classes._2}></span> 
                                <span className={classes.fc1}> </span>
                                <b>Tarix: </b>        /{currentMonth}/{currentYear} 
                                <span className={classes._+" "+ classes._0}></span>  
                                <span className={classes._+" "+ classes._0}></span> 
                                <span className={classes._+" "+ classes._0}></span> 
                                <span className={classes._+" "+ classes._0}></span> 
                            </span>
                        </div>
                        }
                        {page<=1 &&
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x2+" "+ classes.h3+" "+ classes.y3+" "+ classes.ff2+" "+ classes.fs1+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                            <b>QURAŞDIRMA AKTI</b>
                            <span className={classes.ff1+" "+ classes.fs0+" "+ classes.customtopdate}> 
                                <span className={classes._+" "+ classes._1}></span>  
                                <span className={classes._+" "+ classes._2}></span>
                                <span className={classes._+" "+ classes._2}></span>
                                <span className={classes._+" "+ classes._2}></span> 
                                <span className={classes._+" "+ classes._2}></span>  
                                <span className={classes._+" "+ classes._2}></span> 
                                <span className={classes._+" "+ classes._2}></span> 
                                <span className={classes._+" "+ classes._2}></span> 
                                <span className={classes.fc1}> </span>
                                <b>Tarix: </b>        /{currentMonth}/{currentYear} 
                                <span className={classes._+" "+ classes._0}></span>  
                                <span className={classes._+" "+ classes._0}></span> 
                                <span className={classes._+" "+ classes._0}></span> 
                                <span className={classes._+" "+ classes._0}></span> 
                            </span>
                        </div>
                        }
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x3+" "+ classes.h4+" "+ classes.y4+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x2+" "+ classes.h4+" "+ classes.y5+" "+ classes.ff2+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                            <b>Avtomobil haqqında məlumatlar</b>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.y6+" "+ classes.w3+" "+ classes.h5}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y7+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Cihazın məlumatları</div>
                        </div>
                        <div className={classes.c+" "+ classes.x5+" "+ classes.y6+" "+ classes.w4+" "+ classes.h5}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h6+" "+ classes.y8+" "+ classes.ff3+" "+ classes.fs2+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                <b>
                                    Seriya:{qaimeDetailPrintItem.device_detail.serie},     
                                    Model:{qaimeDetailPrintItem.device_detail.device_model_detail.device_mark_detail.name} {qaimeDetailPrintItem.device_detail.device_model_detail.name}
                                </b>
                            </div>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.y9+" "+ classes.w3+" "+ classes.h7}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y8+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                Sim Kartın nömrəsi
                            </div>
                        </div>
                        <div className={classes.c+" "+ classes.x5+" "+ classes.y9+" "+ classes.w4+" "+ classes.h7}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.ya+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                {qaimeDetailPrintItem.simcard!=null&&
                                    <b>{qaimeDetailPrintItem.simcard_detail.number}</b>
                                }
                                {qaimeDetailPrintItem.simcard==null&&
                                    <b></b>
                                }    
                            </div>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.yb+" "+ classes.w3+" "+ classes.h8}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.yc+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Avtomobilin nömrəsi</div>
                        </div>
                        <div className={classes.c+" "+ classes.x5+" "+ classes.yb+" "+ classes.w4+" "+ classes.h8}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.yd+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.ye+" "+ classes.w3+" "+ classes.h7}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y8+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Avtomobilin markası və modeli</div>
                        </div>
                        <div className={classes.c+" "+ classes.x5+" "+ classes.ye+" "+ classes.w4+" "+ classes.h7}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.ya+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.yf+" "+ classes.w3+" "+ classes.h7}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y8+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Avtomobilin növü/təyinatı</div>
                        </div>
                        <div className={classes.c+" "+ classes.x5+" "+ classes.yf+" "+ classes.w4+" "+ classes.h7}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.ya+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        </div>
                        <div className={classes.c+" "+ classes.x1+" "+ classes.y1+" "+ classes.w2+" "+ classes.h0}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x2+" "+ classes.h4+" "+ classes.y10+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.y11+" "+ classes.w5+" "+ classes.h9}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y12+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Eyniləşdirici açarlar:</b></div>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y13+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>1._____________________</div>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y8+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>2. _____________________</div>
                        </div>
                        <div className={classes.c+" "+ classes.x6+" "+ classes.y11+" "+ classes.w6+" "+ classes.h9}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y12+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Proqram təminatı:</b></div>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.ha+" "+ classes.y13+" "+ classes.ff5+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        </div>
                        <div className={classes.c+" "+ classes.x1+" "+ classes.y1+" "+ classes.w2+" "+ classes.h0}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x7+" "+ classes.h2+" "+ classes.y14+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.y15+" "+ classes.w7+" "+ classes.h7}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.ya+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}> 
                                <span className={classes._+" "+ classes._0}></span> 
                                <span className={classes._+" "+ classes._0}></span>  
                                <span className={classes._+" "+ classes._3}></span>
                            </div>
                        </div>
                        <div className={classes.c+" "+ classes.x8+" "+ classes.y15+" "+ classes.w8+" "+ classes.h7}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.ya+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                <b>Bəli</b>
                            </div>
                        </div>
                        <div className={classes.c+" "+ classes.x9+" "+ classes.y15+" "+ classes.w9+" "+ classes.h7}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.ya+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                <b>Xeyr</b>
                            </div>
                        </div>

                        {/* //---BEGIN---Quraşdırıcı qeydləri
                        //Kapital bank istisna olmaqla, digər bütün şirkətlərin quraşdırma vərəqi eynidir
                        //Ona görə də Kapital Bank üçün ayrıca content(Quraşdırıcı qeydləri) düzəldək.Kapital Bank id==15 */}
                        {QaimeDetailPrintItem.company==15 &&
                        <>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y16+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                    Sirenin yandırılması / söndürülməsi
                                </div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y16+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y16+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y18+" "+ classes.wa+" "+ classes.hc}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y19+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                    İmmobilayzerin yandırılması / söndürülməsi
                                </div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y18+" "+ classes.w8+" "+ classes.hc}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y19+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y18+" "+ classes.x9+" "+ classes.hc}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y19+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1a+" "+ classes.wa+" "+ classes.hd}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                    Xarici işıqların yandırılması / söndürülməsi
                                </div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1a+" "+ classes.w8+" "+ classes.hd}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1a+" "+ classes.x9+" "+ classes.hd}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1c+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                    Ardıcıl dayandırmanın yandırılması / söndürülməsi
                                </div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1c+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1c+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1d+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                    Həyacan rejimin yandırılması / söndürülməsi 
                                </div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1d+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1d+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1e+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                    Audentifikasiya edilmədikdə avtomobilin fövqəladə rejimə avtomatik keçməsi
                                </div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1e+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1e+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1f+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Fövqəladə rejimin söndürülməsi</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1f+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1f+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y20+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Hands-free vasitəsi ilə səs əlaqəsinin yaradılması</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y20+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y20+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y21+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Sürücülərin eyniləşdirmə açarının yoxlanılması</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y21+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y21+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y22+" "+ classes.wa+" "+ classes.he}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y23+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Avtomobilin statusunun müəyyən olunması</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y22+" "+ classes.w8+" "+ classes.he}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y23+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y22+" "+ classes.x9+" "+ classes.he}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y23+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y24+" "+ classes.wa+" "+ classes.h9}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y12+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Avtomobilin coğrafi mövqeyinin müəyyən olunması</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y24+" "+ classes.w8+" "+ classes.h9}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y12+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y24+" "+ classes.x9+" "+ classes.h9}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y12+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y25+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y25+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y25+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y26+" "+ classes.wa+" "+ classes.hd}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                        </>
                        }
                        {QaimeDetailPrintItem.company!=15 &&
                        <>
                            {/* //--- Digər şirkətlər--- */}
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y16+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Avtomobildə quraşdırma zamanına elektrik sistemi qənaətbəxş vəziyyətdədir
                                </div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y16+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y16+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y18+" "+ classes.wa+" "+ classes.hc}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y19+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Ehtiyat daşları</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y18+" "+ classes.w8+" "+ classes.hc}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y19+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y18+" "+ classes.x9+" "+ classes.hc}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y19+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1a+" "+ classes.wa+" "+ classes.hd}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>GPS antena</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1a+" "+ classes.w8+" "+ classes.hd}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1a+" "+ classes.x9+" "+ classes.hd}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1c+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Avtomobilin bort kompüterindən məlumatların oxunması</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1c+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1c+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1d+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Çəndə yanacaq səviyyəsi sensoru DUT__/ CAN__ / EDGE_________ Çənin həcmi________</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1d+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1d+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1e+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Sürücülərin eyniləşdirmə açarı</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1e+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1e+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y1f+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Betonqarışdıran _____/ Kuzov _____/ Kompressor sensoru _____            PIN:______________
                                </div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y1f+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y1f+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y20+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Elektrik gərginliyinin kəskin dəyişməsindən xüsusi qoruyucu</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y20+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y20+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y21+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Mühərrikin idarə edilməsi</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y21+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y21+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y22+" "+ classes.wa+" "+ classes.he}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y23+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Təhlükəsizlik kəmərlərin yoxlanılması (Sürücü)</div>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>PIN:______________</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y22+" "+ classes.w8+" "+ classes.he}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y23+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y22+" "+ classes.x9+" "+ classes.he}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y23+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y24+" "+ classes.wa+" "+ classes.h9}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y12+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Təhlükəsizlik kəmərlərin yoxlanılması (Sərnişin)</div>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>PIN:______________</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y24+" "+ classes.w8+" "+ classes.h9}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y12+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y24+" "+ classes.x9+" "+ classes.h9}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y12+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y25+" "+ classes.wa+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Əyləcin vəziyyətinin yoxlanılması</div>
                            </div>
                            <div className={classes.c+" "+ classes.x8+" "+ classes.y25+" "+ classes.w8+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.x9+" "+ classes.y25+" "+ classes.x9+" "+ classes.hb}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y17+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            </div>
                            <div className={classes.c+" "+ classes.xa+" "+ classes.y26+" "+ classes.wa+" "+ classes.hd}>
                                <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Sürət hüdudunun aşması xəbərdarlığı</div>
                            </div>
                        </>
                        }
                        {/* //---END---Quraşdırıcı qeydləri-- */}
                        <div className={classes.c+" "+ classes.x8+" "+ classes.y26+" "+ classes.w8+" "+ classes.hd}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        </div>
                        <div className={classes.c+" "+ classes.x9+" "+ classes.y26+" "+ classes.x9+" "+ classes.hd}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y1b+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        </div>
                        <div className={classes.c+" "+ classes.x1+" "+ classes.y1+" "+ classes.w2+" "+ classes.h0}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x2+" "+ classes.h4+" "+ classes.y28+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}> 
                                <span className={classes._+" "+ classes._0}></span>  
                                <span className={classes._+" "+ classes._0}></span>  
                                <span className={classes._+" "+ classes._0}></span>  
                                <span className={classes._+" "+ classes._0}></span>
                            </div>
                        </div>
                        <div className={classes.c+" "+ classes.xb2+" "+ classes.y29+" "+ classes.wb+" "+ classes.hf}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y2a+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Region:</b></div>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.y2b+" "+ classes.wc+" "+ classes.h10}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y2c+" "+ classes.ff2+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>
                                <b>Müştəri:</b>
                                <span className={classes.ls0}>
                                    <span className={classes.ff1}>
                                        <span className={classes.ff6}>
                                            <b>{qaimeDetailPrintItem.company_detail.name}</b>
                                            <span className={classes._+" "+ classes._0}></span>
                                            <span className={classes.ff1}></span>
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.y2d+" "+ classes.wd+" "+ classes.h11}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y2e+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Yoxlayan və cihazı qoşan:</b></div>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y2f+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Adı Soyadı:</b></div>
                            {/* @for ($i = 0; $i < ceil(sizeof($installers)/3); $i++)@php $key=$i*3; @endphp <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y3{{$i}}+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>@for ($j = 0; $j < 3; $j++)@if( $key<sizeof($installers)){{($key+1).".___".$installers[$key]['firstname']." ".$installers[$key]['lastname']}}@php $key++;@endphp @endif @endfor </div>
                            @endfor */}


                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y30+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>1.___Səddrəddinov Natiq            5.__Məmmədov Rauf</div>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y31+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>2.___Dadaşov Ruslan                  6.__Vəliyev Ruslan</div>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y32+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>3.___Kərimov Təbriz</div>
                        </div>
                        <div className={classes.c+" "+ classes.xc+" "+ classes.y2d+" "+ classes.we+" "+ classes.h11}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y2e+" "+ classes.ff2+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>İmza:</b><span className={classes.ff3}> </span>
                            </div>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y2f+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y30+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        </div>
                        <div className={classes.c+" "+ classes.x0+" "+ classes.y33+" "+ classes.wd+" "+ classes.h9}>
                            <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y34+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Təhvil verən:</b><span></span>
                        </div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y13+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>1.</div>
                    </div>
                    <div className={classes.c+" "+ classes.xc+" "+ classes.y33+" "+ classes.we+" "+ classes.h9}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y34+" "+ classes.ff2+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>İmza:</b><span className={classes.ff3}> </span>
                        </div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y35+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.yc+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                    </div>
                    <div className={classes.c+" "+ classes.x0+" "+ classes.y36+" "+ classes.wf+" "+ classes.h9}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y34+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Təslim alanlar:</b></div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y17+" "+ classes.ff2+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Avtomobil, Sifarişçi təyin etdiyi şəxs tərəfindən yoxlanılıb və  işlək vəziyyətdə təslim alınıb.
                        </div>
                    </div>
                    <div className={classes.c+" "+ classes.x0+" "+ classes.y37+" "+ classes.wd+" "+ classes.h12}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y38+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Adı Soyadı : </b></div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y39+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Tutduğu vəzifə:</b></div>
                    </div>
                    <div className={classes.c+" "+ classes.xc+" "+ classes.y37+" "+ classes.we+" "+ classes.h12}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y3a+" "+ classes.ff2+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>İmza:</b><span className={classes.ff3}> </span></div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y3b+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y3c+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                    </div>
                    <div className={classes.c+" "+ classes.x0+" "+ classes.h4+" "+ classes+" "+ classes.h9}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y12+" "+ classes.ff4+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Adı Soyadı :</b></div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y13+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}><b>Tutduğu vəzifə:</b></div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h2+" "+ classes.y8+" "+ classes.ff1+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                    </div>
                    <div className={classes.c+" "+ classes.c+" "+ classes.y3d+" "+ classes.we+" "+ classes.h9}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x4+" "+ classes.h4+" "+ classes.y34+" "+ classes.ff3+" "+ classes.fs0+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                    </div>
                    <div className={classes.c+" "+ classes.x2+" "+ classes.y3e+" "+ classes.w10+" "+ classes.h13}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.xd+" "+ classes.h14+" "+ classes.y3f+" "+ classes.ff1+" "+ classes.fs4+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                    </div>
                    <div className={classes.c+" "+ classes.xe+" "+ classes.y3e+" "+ classes.w11+" "+ classes.h13}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.xd+" "+ classes.h14+" "+ classes.y40+" "+ classes.ff1+" "+ classes.fs4+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}> <span className={classes._+" "+ classes._0}></span>  <span className={classes._+" "+ classes._0}></span>
                        </div>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.xf+" "+ classes.h14+" "+ classes.y41+" "+ classes.ff4+" "+ classes.fs4+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Azərbaycan Respublikası,</div>
                    </div>
                    <div className={classes.c+" "+ classes.x2+" "+ classes.y42+" "+ classes.w10+" "+ classes.h15}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.xd+" "+ classes.h14+" "+ classes.y43+" "+ classes.ff1+" "+ classes.fs4+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                    </div>
                    <div className={classes.c+" "+ classes.xe+" "+ classes.y42+" "+ classes.w11+" "+ classes.h15}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x10+" "+ classes.h14+" "+ classes.y43+" "+ classes.ff4+" "+ classes.fs4+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Bakı, AZ-1008, Ə.Agaoğlu küç. 24-B</div>
                    </div>
                    <div className={classes.c+" "+ classes.x2+" "+ classes.y44+" "+ classes.w10+" "+ classes.h15}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.xd+" "+ classes.h14+" "+ classes.y43+" "+ classes.ff1+" "+ classes.fs4+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}></div>
                    </div>
                    <div className={classes.c+" "+ classes.xe+" "+ classes.y44+" "+ classes.w11+" "+ classes.h15}>
                        <div className={classes.t+" "+ classes.m0+" "+ classes.x11+" "+ classes.h14+" "+ classes.y43+" "+ classes.ff1+" "+ classes.fs4+" "+ classes.fc0+" "+ classes.sc0+" "+ classes.ls0+" "+ classes.ws0}>Tel: +994-12-4960056</div>
                    </div>
                </div>
            </div>
            <div className={classes.pi} data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
         </div>
        }
        </>
    )
}

export default QaimeInstallationActPrintContainer;