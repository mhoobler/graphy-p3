import React from 'react';

function Modal() {
    return (
        <div id="graph-modal" className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                        
                    <h5 className="modal-title">Create Graph Pin</h5>
                </div>
                    <div className="modal-body">
                    <form>
                        <label htmlFor="graph-modal-symbol">Stock selected:</label>
                        <input id="graph-modal-symbol" type="text" disabled />
                        <label htmlFor="graph-modal-date">Date selected:</label>
                        <input id="graph-modal-date" type="text" disabled />
                        <label htmlFor="graph-modal-text">Notes:</label>
                        <input id="graph-modal-text" type="text" />
                    </form>
                    </div>
                        
                    <div className="modal-footer">
                    <button id="submit-modal" type="button" className="btn btn-primary">Save changes</button>
                    <button id="close-modal" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;