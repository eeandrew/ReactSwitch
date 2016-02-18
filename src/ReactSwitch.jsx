import React from 'react';

export default class ReactSwitch extends React.Component {
	constructor() {
		super();
		this.state = {
			translateX:0,
			initX:0,
			transitionDuration:0,
			dragging:false
		};

		this.TRANSITION_DURATION = 150;
		this.x = 0;
	}

	handleTouchStart(e) {
		this.setState({dragging:true});
		let point = e.touches ? e.touches[0] : e;
		this.setState({transitionDuration:0});

		this.startX = this.x;
		this.pointX = point.pageX;
	}

	handleTouchMove(e) {
		if(!this.state.dragging) return;
		let point = e.touches ? e.touches[0] : e,
		deltaX = point.pageX - this.pointX,
		newX;

		this.pointX = point.pageX;

		newX = this.x + deltaX;

		if(Math.abs(newX) > this.props.maxSwipe) {
			newX = this.x + deltaX / 3;
		}

		if(this.props.direction === 'LEFT' && newX > 0) return;
		if(this.props.direction === 'RIGHT' && newX < 0) return;

		this.setState({
			translateX : newX
		});
		this.x = newX;
	}


	handleTouchEnd(e) {
		this.setState({dragging:false});
		this.onTouchCancel.bind(this)(e);
	}

	handleTouchCancel(e) {
		this.setState({dragging:false});
		this.onTouchCancel.bind(this)(e);
	}

	onTouchCancel(e) {
		let point = e.touches ? e.touches[0] : e,
 		newX = Math.round(this.x);
 		this.setState({
 			transitionDuration : this.TRANSITION_DURATION
 		});
 		if(Math.abs(newX) > this.props.maxSwipe) {
 			this.setState({
 				translateX : this.props.maxSwipe * (newX > 0 ? 1 : -1)
 			})
 			this.x = this.props.maxSwipe * (newX > 0 ? 1 : -1)
 		}else {
 			this.setState({
 				translateX : 0
 			})
 			this.x = 0;
 		}
	}	

	render() {
		let tranformStyle = {
			transform : 'translate3D(' + this.state.translateX  + 'px' + ',0,0' +')',
			//transform : 'translateX(' + this.state.translateX  + 'px' +')',
			transitionTimingFunction : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			transitionDuration : this.state.transitionDuration + 'ms'
		};

		let switchStyle = {
			display:'inline-block',
			position:'relative',
			width: '44px',
			height:'22px',
			borderRadius : '20px',
			background : 'blue',
		}

		let switchInnerStyle = {
			position:'absolute',
			width:'20px',
			height:'20px',
			borderRadius:'50%',
			background:'gray',
			top:'1px',
			transition:'left .3s cubic-bezier(.78, .14, .15, .86)',
			msTransition:'left .3s cubic-bezier(.78, .14, .15, .86)',
			WebkitTransition:'left .3s cubic-bezier(.78, .14, .15, .86)',
		}
		return (
				<span style={switchStyle}> 
					<span style={switchInnerStyle}></span>
				</span>
		);
	}
}

