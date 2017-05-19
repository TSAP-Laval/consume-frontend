import * as React from "react";
import {Size} from "../../../../Models/ComponentModels"
import {MenuItem, DropDownMenu} from 'material-ui';

export interface ILayoutProps {
    zone_size: Size
}

export interface ILayoutState {

}

export class ZoneSizeComponent extends React.Component<ILayoutProps, ILayoutState> {
    readonly widthChoices = [2,3,4,5,6,7,8,9,10,11,12];
    readonly heightChoices = [1,2,3,4,5,6,7,8];
    constructor(props: ILayoutProps) {
        super(props);
    }

    handleChange(e: __MaterialUI.TouchTapEvent, index: number, menuItemValue: any) {
        alert(menuItemValue);
    }

    render() {
        const styles = {
            customWidth: {
                width: 200,
            },
        };
        const textWidth = this.props.zone_size.width;
        const widthDropDown = this.widthChoices.map((val) => {
            return (
                <MenuItem value={val} primaryText={val + " Zones"} />
            )
        });

        const textHeight = this.props.zone_size.height;
        const heightDropDown = this.heightChoices.map((val) => {
            return (
                <MenuItem value={val} primaryText={val + " Zones"} />
            )
        });
        return <div><h4>Hauteur</h4><DropDownMenu value={textHeight} onChange={this.handleChange} style={styles.customWidth} autoWidth={false}>{heightDropDown}</DropDownMenu><h4>Longeur</h4><DropDownMenu value={textWidth} onChange={this.handleChange} style={styles.customWidth} autoWidth={false}>{widthDropDown}</DropDownMenu></div>
    }
}