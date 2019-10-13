import React, { Component } from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components'
import {SystemState, ToastType} from '../store/system/types'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import ToastMessage from './ToastMessage'
import FadeIn from './FadeIn'

const Div = styled.div`
  position:fixed;
  bottom:50px;
  left: 50%;
  transform: translateX(-50%);
  z-index:9999;
`

// interface Props {
//   toastQueue: ToastType[],
// }

class ToastContainer extends Component {
  render() {
    const { toast} = this.props;
    console.log('toastQueue',toast)
    return (
      <Div>
        <TransitionGroup appear>
          {toast.map((toast,i) => {
            return (
              <FadeIn keyProps={i} key={i} duration={300}>
                <ToastMessage title={toast.title} content={toast.content} />
              </FadeIn>
            )
          })}
        </TransitionGroup>
        </Div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toast: state.system.get('queue').toJS(),
  }
}

export default connect(mapStateToProps)(ToastContainer);