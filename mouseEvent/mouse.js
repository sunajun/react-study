const data = new Map()
data.set('id001','id001')
data.set('id002','id002')
data.set('id003','id003')
data.set('id004','id004')

class DND extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      rightdata:this.props.data,
      leftdata:new Map(),
      dragId:null
    }
    this.drag = this.drag.bind(this)
    this.drop = this.drop.bind(this)
    this.drop2 = this.drop2.bind(this)
  }

  drag(event){
    this.state.dragId = event.target.id
    // this.setState({
    //   dragId:event.target.id
    // })
    console.log(event.target)
  }

  drop(event){
    console.log('drop')
    var value = this.state.rightdata.get(this.state.dragId)
    this.state.leftdata.set(this.state.dragId,value)
    this.state.rightdata.delete(this.state.dragId)
    this.forceUpdate()
  }

  drop2(event){
    var value = this.state.leftdata.get(this.state.dragId)
    this.state.rightdata.set(this.state.dragId,value)
    this.state.leftdata.delete(this.state.dragId)
    this.forceUpdate()
  }

  render(){
    const rightList = []
    const leftList = []
    for (let item of this.state.rightdata) {
      rightList.push(<p draggable={true} onDragStart={this.drag} id={item[0]} key={item[0]}>{item[1]}</p>)
    }
    for (let item of this.state.leftdata) {
      leftList.push(<p draggable={true} onDragStart={this.drag} id={item[0]} key={item[0]}>{item[1]}</p>)
    }

      return <div>
      <div id='leftsection' onDrop={this.drop}
           onDragEnter={e=>e.preventDefault()}
           onDragOver={e=>e.preventDefault()}>
        {leftList}
      </div>
      <div id='rightsection' onDragEnter={e=>e.preventDefault()}
           onDragOver={e=>e.preventDefault()} onDrop={this.drop2}>
        {rightList}
      </div>
    </div>
  }
}

ReactDOM.render(<DND data={data}/>,document.getElementById('test'))