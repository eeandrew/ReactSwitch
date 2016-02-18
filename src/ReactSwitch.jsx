import React from 'react';

export default class ReactSwitch extends React.Component {
	constructor() {
		super();
		this.state = {
			translateX:0,
			initX:0,
			transitionDuration:0,
			open:false, 
		};
		this.dragging = false;
		this.TRANSITION_DURATION = 150;
		this.x = 0;
		this.MAX_MOVE_RANGE = 63;
	}

	handleTouchStart(e) {
		this.dragging = true;
		let point = e.touches ? e.touches[0] : e;
		this.setState({transitionDuration:0});

		this.startX = this.x;
		this.pointX = point.pageX;
	}

	handleTouchMove(e) {
		if(!this.dragging) return;
		let point = e.touches ? e.touches[0] : e,
		deltaX = point.pageX - this.pointX,
		newX;

		this.pointX = point.pageX;

		newX = this.x + deltaX;

		//最大滑动范围 20px
		if(Math.abs(newX) > this.MAX_MOVE_RANGE) {
			return;
		}
		if(this.state.open && newX > this.MAX_MOVE_RANGE) return;
		if(!this.state.open && newX < 0) return;

		this.setState({
			translateX : newX
		});
		this.x = newX;
	}


	handleTouchEnd(e) {
		this.dragging = false;
		this.onTouchCancel.bind(this)(e);
	}

	handleTouchCancel(e) {
		this.dragging = false;
		this.onTouchCancel.bind(this)(e);
	}

	onTouchCancel(e) {
		let point = e.touches ? e.touches[0] : e,
 		newX = Math.round(this.x);
 		this.setState({
 			transitionDuration : this.TRANSITION_DURATION
 		});
 		console.log(newX)
 		if((Math.abs(newX) > (this.MAX_MOVE_RANGE / 2)) && !this.state.open ||
 			this.state.open && (this.MAX_MOVE_RANGE - Math.abs(newX)) > this.MAX_MOVE_RANGE/2 ) {
 			this.setState({
 				open: !this.state.open
 			})
 			if((Math.abs(newX) > (this.MAX_MOVE_RANGE / 2)) && !this.state.open){
 				this.setState({
	 				translateX : this.MAX_MOVE_RANGE
	 			})
			}
			if(this.state.open && (this.MAX_MOVE_RANGE - Math.abs(newX)) > this.MAX_MOVE_RANGE/2){
				this.setState({
	 				translateX : 0
	 			})
			}
 			
 			this.x = newX > 0 ? this.MAX_MOVE_RANGE : 0
 		}else {
 			this.setState({
 				translateX : newX > 0 ? 0 : this.MAX_MOVE_RANGE
 			})
 			this.x = newX > 0 ? 0 : this.MAX_MOVE_RANGE
 		}
	}	

	render() {
		let tranformStyle = {
			transform : 'translate3D(' + this.state.translateX  + 'px' + ',0,0' +')',
		};

		let switchStyle = {
			display:'inline-block',
			position:'relative',
			width: '84px',
			height:'22px',
			borderRadius : '20px',
			background : this.state.open ? '#2db7f5' : '#ccc',
		}

		let switchInnerStyle = {
			position:'absolute',
			width:'20px',
			height:'20px',
			borderRadius:'50%',
			background:'#fff',
			top:'1px',
			//transition:'left .3s cubic-bezier(.78, .14, .15, .86)',
			//msTransition:'left .3s cubic-bezier(.78, .14, .15, .86)',
			//WebkitTransition:'left .3s cubic-bezier(.78, .14, .15, .86)',
		}
		return (
				<span style={switchStyle}> 
					<span style={Object.assign({},switchInnerStyle,tranformStyle)} 
						onTouchStart={this.handleTouchStart.bind(this)}
						onMouseDown={this.handleTouchStart.bind(this)}
						onTouchMove={this.handleTouchMove.bind(this)}
						onMouseMove={this.handleTouchMove.bind(this)}
						onTouchEnd={this.handleTouchEnd.bind(this)}
						onMouseUp={this.handleTouchEnd.bind(this)}
						onTouchCancel={this.handleTouchCancel.bind(this)}
						onMouseCancel={this.handleTouchCancel.bind(this)}
					/>
				</span>
		);
	}
}

