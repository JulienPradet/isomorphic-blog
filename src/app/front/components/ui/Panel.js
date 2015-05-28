import React from 'react'

export default class Panel extends React.Component{
	render() {
		const panelClass = "panel"+(typeof this.props.type !== "undefined" ? "--"+this.props.type : "")+" panel--"+this.props.size;

		return (
			<div className={panelClass}>
				{this.props.children}
			</div>
		);
	}
}
