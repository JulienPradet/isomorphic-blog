import React from 'react'

export default class Panel extends React.Component{
	render() {
		const panelClass =
			"panel"+(typeof this.props.type !== "undefined" ? "--"+this.props.type : "")
			+" panel"+(typeof this.props.size !== "undefined" ? "--"+this.props.size : "--10");

		return (
			<div className={panelClass}>
				{this.props.children}
			</div>
		);
	}
}
