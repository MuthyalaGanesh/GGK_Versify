import React from 'react'
import BasicInfo from '../components/BasicInfo'

export class LocationWizard extends React.Component {
  constructor(props) {
    super(props) 
  }
   render() {
       return(
    <div>
    <div id="content_footer" style={{width: "85%", float:'right'}}>
        <div className="col-md-12">
            <div className="pull-right">
                <button onClick={this.props.showResults} className="btn btn-primary" type="submit">
                   {this.props.page} - Save
                </button>
            </div>
        </div>
    </div>

    <section className="content">
        <div className="row">
            <div className="col-xs-12">
                <div className="box" style={{marginBottom:'20px'}}>
                    <BasicInfo />
                </div>
            </div>
        </div>
    </section>
</div>
       )}
}


export default LocationWizard
