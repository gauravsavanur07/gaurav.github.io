import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commafy from 'commafy'
import toastr from 'toastr'

import registry from '../services/registry'
import StatProgressBar from './StatProgressBar'

import './DomainVoteTokenDistrubution.css'

class DomainVoteTokenDistrubution extends Component {

constructor (props0 {
super ()

this.state = {

domain: props.domain,
      votesFor: 0,
      votesAgainst: 0
    }
     this.getPoll()
  }
 async getPoll () {
    const {domain} = this.state
     try {
      const {
        votesFor,
        votesAgainst
      } = await registry.getChallengePoll(domain)
       this.setState({
        votesFor,
        votesAgainst
      })
    } catch (error) {
      toastr.error(error)
    }
  }
   render () {
    const {
      votesFor,
      votesAgainst
    } = this.state
     // "N | 0" coerces to int or to 0 if NaN
    const totalVotes = ((votesFor + votesAgainst) | 0)
    const supportFill = ((totalVotes / votesFor * 1e2) | 0)
    const opposeFill = ((totalVotes / votesAgainst * 1e2) | 0)
     return (
      <div className='column sixteen wide center aligned DomainVoteTokenDistribution'>
        <div className='ProgressContainer'>
          <p>
            ADT holders have revealed their vote to show:
          </p>
          <div className='BarContainer'>
            <StatProgressBar
              fills={[supportFill, opposeFill]}
              showFillLabels
              showLegend
              fillLabels={['SUPPORT', 'OPPOSE']}
            />
          </div>
          <div className='Breakdown'>
            <div className='BreakdownItem'>
              <div className='BreakdownItemBox' />
              <span className='BreakdownItemLabel'>{commafy(votesFor)} ADT</span>
            </div>
            <div className='BreakdownItem'>
              <div className='BreakdownItemBox' />
              <span className='BreakdownItemLabel'>{commafy(votesAgainst)} ADT</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 DomainVoteTokenDistribution.propTypes = {
  domain: PropTypes.string
}
 export default DomainVoteTokenDistribution
