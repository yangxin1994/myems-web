import React, { Fragment, useEffect, useState } from 'react';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  Button, 
  ButtonGroup, 
  FormGroup,
  Input,
  Label,
  CustomInput 
} from 'reactstrap';
import CountUp from 'react-countup';
import Datetime from 'react-datetime';
import loadable from '@loadable/component';
import Cascader from 'rc-cascader';
import CardSummary from '../common/CardSummary';
import LineChart from '../common/LineChart';
import SharePie from '../common/SharePie';
import { withTranslation } from 'react-i18next';


const DetailedDataTable = loadable(() => import('./DetailedDataTable'));

const CombinedEquipmentSaving = ({t}) => {
  // State
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [combinedEquipment, setCombinedEquipment] = useState(undefined);
  const [basePeriodBeginsDatetime, setBasePeriodBeginsDatetime] = useState(null);
  const [basePeriodEndsDatetime, setBasePeriodEndsDatetime] = useState(null);
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(null);
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(null);
  const [periodType, setPeriodType] = useState('hourly');
  
  const cascaderOptions = [{
    label: '成都项目',
    value: 1,
    children: [{
      label: '租区',
      value: 2,
      children: [{
        label: '大租户',
        value: 9,
      }, {
        label: '餐饮租户',
        value: 10,
      }, {
        label: '零售租户',
        value: 11,
      }],
    }, {
      label: '公区商场',
      value: 3,
      children: [{
        label: '给排水',
        value: 12,
      }, {
        label: '扶梯直梯',
        value: 13,
      }, {
        label: '照明及插座',
        value: 14,
      }, {
        label: '空调水',
        value: 15,
      }, {
        label: '空调风',
        value: 16,
      }, {
        label: '特殊功能房间',
        value: 17,
      }, {
        label: '其他用电设备',
        value: 18,
      }]
    }, {
      label: '公区车库',
      value: 4,
      children: [{
        label: '车库通风',
        value: 5,
      }, {
        label: '车库照明',
        value: 6,
        children: [{
          label: '应急照明',
          value: 7,
        }, {
          label: '普通照明',
          value: 8,
        }
        ]
      }]
    }],
  }];
  
  const combinedEquipmentList = [
    { value: 1, label: '冷站'},
    { value: 2, label: '锅炉房'}];

  const periodTypeOptions = [
    { value: 'yearly', label: 'Yearly'},
    { value: 'monthly', label: 'Monthly'},
    { value: 'daily', label: 'Daily'},
    { value: 'hourly', label: 'Hourly'}];

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';
  
  const tceshare = [
    { id: 1, value: 5890863/8135.56, name: '电', color: '#2c7be5' },
    { id: 2, value: 29878/1000, name: '自来水', color: '#27bcfd' },
    { id: 3, value: 9887/751.8, name: '天然气', color: '#d8e2ef' }
  ];
  const co2share = [
    { id: 1, value: (5890863/8135.56)*0.67, name: '电', color: '#2c7be5' },
    { id: 2, value: (29878/1000)*0.67, name: '自来水', color: '#27bcfd' },
    { id: 3, value: (9887/751.8)*0.67, name: '天然气', color: '#d8e2ef' }
  ];
  const combinedEquipmentLineChartLabels = [
    '2020-07-01',
    '2020-07-02',
    '2020-07-03',
    '2020-07-04',
    '2020-07-05',
    '2020-07-06',
    '2020-07-07',
    '2020-07-08',
    '2020-07-09',
    '2020-07-10',
    '2020-07-11',
    '2020-07-12'
  ];
  
  const combinedEquipmentLineChartData = {
    a: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
    b: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    c: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    d: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };

  
  const combinedEquipmentLineChartOptions = [
    { value: 'a', label: '电'},
    { value: 'b', label: '自来水'},
    { value: 'c', label: '天然气'},
    { value: 'd', label: '二氧化碳排放'}];

  const parameterLineChartLabels = [
    '2020-07-01',
    '2020-07-02',
    '2020-07-03',
    '2020-07-04',
    '2020-07-05',
    '2020-07-06',
    '2020-07-07',
    '2020-07-08',
    '2020-07-09',
    '2020-07-10',
    '2020-07-11',
    '2020-07-12'
  ];
    
  const parameterLineChartData = {
    a: [40, 31, 36, 32, 27, 32, 34, 26, 25, 24, 25, 30],
    b: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
    c: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    d: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2],
    e: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
  };
  
  const parameterLineChartOptions = [
    { value: 'a', label: '室外温度'},
    { value: 'b', label: '相对湿度'},
    { value: 'c', label: '电费率'},
    { value: 'd', label: '自来水费率'},
    { value: 'e', label: '天然气费率'}];

  const  detailedDataTableData =[
    {
      id: 1,
      startdatetime: '2020-07-01',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 2,
      startdatetime: '2020-07-02',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 3,
      startdatetime: '2020-07-03',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 4,
      startdatetime: '2020-07-04',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 5,
      startdatetime: '2020-07-05',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 6,
      startdatetime: '2020-07-06',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 7,
      startdatetime: '2020-07-07',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 8,
      startdatetime: '2020-07-08',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 9,
      startdatetime: '2020-07-09',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 10,
      startdatetime: '2020-07-10',
      a: '9872',
      b: '3457',
      c: '567',
      d: '567',
    },
    {
      id: 11,
      startdatetime: '总计',
      a: '98720',
      b: '34570',
      c: '5670',
      d: '5670',
    }
  ];
  const detailedDataTableColumns = [{
    dataField: 'startdatetime',
    text: '日期时间',
    sort: true
  }, {
    dataField: 'a',
    text: '节约电 (kWh)',
    sort: true
  }, {
    dataField: 'b',
    text: '节约自来水 (M3)',
    sort: true
  }, {
    dataField: 'c',
    text: '节约天然气 (M3)',
    sort: true
  }, {
    dataField: 'd',
    text: '减少二氧化碳排放 (T)',
    sort: true
  }];

  let onCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpace(selectedOptions.map(o => o.label).join('/'))
  }

  useEffect(() => {
    
  }, []);

  
  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Combined Equipment Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Saving')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Row form>
            <Col xs="auto">
              <FormGroup className="form-group">
                <Label className={labelClasses} for="space">
                {t('Space')}
                </Label>
                <br />
                <Cascader options={cascaderOptions} 
                          onChange={onCascaderChange}
                          changeOnSelect
                          expandTrigger="hover">
                  <Input
                    value={selectedSpace}
                  />
                </Cascader>
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="combinedEquipment">
                {t('Combined Equipment')}
                </Label>
                <CustomInput type="select" id="组合设备" name="combinedEquipment" value={combinedEquipment} onChange={({ target }) => setCombinedEquipment(target.value)}
                >
                  { combinedEquipmentList.map((combinedEquipment, index) => (
                      <option value={combinedEquipment.value} key={combinedEquipment.value}>
                        {combinedEquipment.label}
                      </option>
                    ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="basePeriodBeginsDatetime">
                {t('Base Period Begins')}
                </Label>
                <Datetime id='basePeriodBeginsDatetime' value={basePeriodBeginsDatetime} />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="basePeriodEndsDatetime">
                {t('Base Period Ends')}
                </Label>
                
                <Datetime id='basePeriodEndsDatetime' />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingPeriodBeginsDatetime">
                {t('Reporting Period Begins')}
                </Label>
                <Datetime id='reportingPeriodBeginsDatetime' />
              </FormGroup>
            </Col>
            <Col >
              <FormGroup className="form-group">
                <Label className={labelClasses} for="reportingPeriodEndsDatetime">
                {t('Reporting Period Ends')}
                </Label>
                <Datetime id='reportingPeriodEndsDatetime' />
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup>
                <Label className={labelClasses} for="periodType">
                {t('Period Types')}
                </Label>
                <CustomInput type="select" id="periodType" name="periodType" value={periodType} onChange={({ target }) => setPeriodType(target.value)}
                >
                  { periodTypeOptions.map((periodType, index) => (
                      <option value={periodType.value} key={periodType.value}>
                        {t(periodType.label)}
                      </option>
                    ))}
                </CustomInput>
              </FormGroup>
            </Col>
            <Col xs="auto">
              <FormGroup>
                <br></br>
                <ButtonGroup id="submit">
                  <Button color="success" >{t('Submit')}</Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
          </Row> 
        </CardBody>
      </Card>
      <div className="card-deck">
        <CardSummary rate="-0.23%" title="报告期节约电量(基线值-实际值) (kWh)" color="success" footnote="" footvalue="" footunit="" >
          <CountUp end={764.39} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="报告期节约自来水量(基线值-实际值) (M3)" color="info" footnote="" footvalue="" footunit="">
          <CountUp end={878} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="0.0%" title="报告期节约天然气量(基线值-实际值) (M3)" color="info" footnote="" footvalue="" footunit="">
        <CountUp end={87} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
        <CardSummary rate="+9.54%" title="报告期节约吨标准煤量(基线值-实际值)(TCE)" color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={764.39/8135.56+87/751.8} duration={2} prefix="" separator="," decimal="." decimals={2}  />
        </CardSummary>
        <CardSummary rate="+9.54%" title="报告期减少二氧化碳排放量(基线值-实际值) (T)" color="warning" footnote="" footvalue="" footunit="">
          <CountUp end={(764.39/8135.56+87/751.8)*0.67} duration={2} prefix="" separator="," decimals={2} decimal="." />
        </CardSummary>
      </div>
      <Row noGutters>
        <Col className="mb-3 pr-lg-2 mb-3">
          <SharePie data={tceshare} title={'吨标准煤比例'} />
        </Col>
        <Col className="mb-3 pr-lg-2 mb-3">
          <SharePie data={co2share} title={'二氧化碳排放比例'} />
        </Col>
      </Row>
      <LineChart reportingTitle='报告期节约电量 764.39 (kWh) (基线值-实际值)' 
        baselineTitle='基准期节约电量 684.87 (kWh)(基线值-实际值)' 
        labels={combinedEquipmentLineChartLabels} 
        data={combinedEquipmentLineChartData}
        options={combinedEquipmentLineChartOptions}>
      </LineChart>

      <LineChart reportingTitle={t('Related Parameters')} 
        baselineTitle='' 
        labels={parameterLineChartLabels} 
        data={parameterLineChartData}
        options={parameterLineChartOptions}>
      </LineChart>
      <br />
      <DetailedDataTable data={detailedDataTableData} title={t('Detailed Data')} columns={detailedDataTableColumns}>
      </DetailedDataTable>
      
    </Fragment>
  );
};

export default withTranslation()(CombinedEquipmentSaving);