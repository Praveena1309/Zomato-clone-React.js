import React from "react";
import Qsitem from "./quicksearchitem";

class Search extends React.Component {
  render() {
    const { mealtypeData } = this.props;

    if (!mealtypeData) {
      return null; // or a loading indicator
    }

    return (
      <>
        <div className="container">
          <div className="row pt-4">
            <div className="col-12" id="nnfd">
              <h4 className="Quick ">Quick Searches</h4>
              <p className="Discover">Discover restaurants by type of meal</p>
            </div>
          </div>
          <div className="d-flex flex-wrap" id="nnfd">
            {mealtypeData.map((e) => {
              return <Qsitem data={e} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Search;
