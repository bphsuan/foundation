import React from 'react';
import Title from '../Title/Title';
import './Hot.scss';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Guide, Label } from 'bizcharts';
import DataSet from "@antv/data-set";
// 数据源
const data = [
  { genre: 'Sports', sold: 275, income: 2300 },
  { genre: 'Strategy', sold: 115, income: 667 },
  { genre: 'Action', sold: 120, income: 982 },
  { genre: 'Shooter', sold: 350, income: 5271 },
  { genre: 'Other', sold: 150, income: 3710 }
];

// 定义度量
const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};
const { DataView } = DataSet;
const { Html } = Guide;
const data2 = [
  {
    item: "事例一",
    count: 40
  },
  {
    item: "事例二",
    count: 21
  },
  {
    item: "事例三",
    count: 17
  },
  {
    item: "事例四",
    count: 13
  },
  {
    item: "事例五",
    count: 9
  }
];
const dv = new DataView();
dv.source(data2).transform({
  type: "percent",
  field: "count",
  dimension: "item",
  as: "percent"
});
const cols2 = {
  percent: {
    formatter: val => {
      val = val * 100 + "%";
      return val;
    }
  }
};
class Hot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "熱銷排行 Top 3"
    }
  }
  render() {
    return (
      <div className="hot-content">
        <Title name={this.state.name} />
        <div id="mountNode">
          <Chart width={600} height={400} data={data} scale={cols}>
            <Axis name="genre" title />
            <Axis name="sold" title />
            <Legend position="top" dy={-20} />
            <Tooltip />
            <Geom type="interval" position="genre*sold" color="genre" />
          </Chart>

          {/*餅圖*/}
          <Chart
            height={window.innerHeight}
            data={dv}
            scale={cols2}
            padding={[80, 100, 80, 80]}
            forceFit
          >
            <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
            <Axis name="percent" />
            <Legend
              position="right"
              offsetY={-window.innerHeight / 2 + 120}
              offsetX={-100}
            />
            <Tooltip
              showTitle={false}
              itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            />
            <Guide>
              <Html
                position={["50%", "50%"]}
                html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
                alignX="middle"
                alignY="middle"
              />
            </Guide>
            <Geom
              type="intervalStack"
              position="percent"
              color="item"
              tooltip={[
                "item*percent",
                (item, percent) => {
                  percent = percent * 100 + "%";
                  return {
                    name: item,
                    value: percent
                  };
                }
              ]}
              style={{
                lineWidth: 1,
                stroke: "#fff"
              }}
            >
              <Label
                content="percent"
                formatter={(val, item) => {
                  return item.point.item + ": " + val;
                }}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    )
  }
}

export default Hot