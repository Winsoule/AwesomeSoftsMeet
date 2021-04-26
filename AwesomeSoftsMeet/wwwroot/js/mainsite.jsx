class MeetingBox extends React.Component {
	state = { data: this.props.initialData };

	loadMeetingsFromServer = () => {
		var xhr = new XMLHttpRequest();
		xhr.open('get', this.props.url, true);
		xhr.onload = function () {
			var data = JSON.parse(xhr.responseText);
			this.setState({ data: data });
		}.bind(this);
		xhr.send();
	};

	handleMeetingSubmit = meeting => {
		var meetings = this.state.data;
		meetings.id = Date.now();

		var xhr = new XMLHttpRequest();
		xhr.open('post', this.props.submitUrl, true);
		xhr.onload = function () {
			this.loadMeetingsFromServer();
		}.bind(this);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON.stringify(meeting));
	};

	componentDidMount() {
		window.setInterval(this.loadMeetinsFromServer, this.props.pollInterval);
	}

	render() {
		return (
			<div className="meetingBox">
				<h1>AwesomeSoft Meetings Booking</h1>
				<h2>Make new meeting</h2>
				
				<MeetingForm onMeetingSubmit={this.handleMeetingSubmit} />

				<MeetingList data={this.state.data} />
			</div>
		);
	}
}


class MeetingForm extends React.Component {
	state = {
		room: '',
		sTimeHour: '1',
		sTimeMin: '15',
		eTimeHour: '1',
		eTimeMin: '15',
		day: '1',
		month: '1',
		year: '2021',
		email: ''
	};

	handleRoomChange = e => {
		this.setState({ room: e.target.value });
	};

	handlesTimeHourChange = e => {
		this.setState({ sTimeHour: e.target.value });
	};

	handlesTimeMinChange = e => {
		this.setState({ sTimeMin: e.target.value });
	};

	handleeTimeHourChange = e => {
		this.setState({ eTimeHour: e.target.value });
	};

	handleeTimeMinChange = e => {
		this.setState({ eTimeMin: e.target.value });
	};

	handleDayChange = e => {
		this.setState({ day: e.target.value });
	};

	handleMonthChange = e => {
		this.setState({ month: e.target.value });
	};

	handleYearChange = e => {
		this.setState({ year: e.target.value });
	};

	handleEmailChange = e => {
		this.setState({ email: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		var room = this.state.room.trim();
		var email = this.state.email.trim();
		if (!room || !email) {
			return;
		}
		this.props.onMeetingSubmit({ ...this.state, room, email });

		this.setState({
			room: '',
			sTimeHour: '1',
			sTimeMin: '15',
			eTimeHour: '1',
			eTimeMin: '15',
			day: '1',
			month: '1',
			year: '2021',
			email: '' });
	};

	render() {
		return (
			<form className="MeetingForm" onSubmit={this.handleSubmit}>
				<text>Room name/number</text>

				<input
					type="text"
					placeholder="Name of room"
					value={this.state.room}
					onChange={this.handleRoomChange}
				/>

				<text>Start</text>

				<label>
					<select value={this.state.sTimeHour} onChange={this.handlesTimeHourChange}>
						{[...Array(24).keys()].map((value, index) => {
							return <option key={index} value={value + 1}>{(value + 1).toString().padStart(2, '0')}</option>
						})}
					</select>
				</label>

				<label>
					<select value={this.state.sTimeMin} onChange={this.handlesTimeMinChange}>
						<option value="15">15</option>
						<option value="30">30</option>
						<option value="45">45</option>
						<option value="0">00</option>
					</select>
				</label>
				
				<text>End</text>
				<label>
					<select value={this.state.eTimeHour} onChange={this.handleeTimeHourChange}>
						{[...Array(24).keys()].map((value, index) => {
							return <option key={index} value={value}>{(value).toString().padStart(2, '0')}</option>
						})}
					</select>
				</label>

				<label>
					<select value={this.state.eTimeMin} onChange={this.handleeTimeMinChange}>
						<option value="15">15</option>
						<option value="30">30</option>
						<option value="45">45</option>
						<option value="0">00</option>
					</select>
				</label>

				<text>Day</text>

				<label>
					<select value={this.state.day} onChange={this.handleDayChange}>
						{[...Array(31).keys()].map((value, index) => {
							return <option key={index} value={value + 1}>{(value + 1).toString().padStart(2, '0')}</option>
						})}
					</select>
				</label>

				<text>Month</text>

				<label>
					<select value={this.state.month} onChange={this.handleMonthChange}>
						<option value="1">January</option>
						<option value="2">February</option>
						<option value="3">March</option>
						<option value="4">April</option>
						<option value="5">May</option>
						<option value="6">June</option>
						<option value="7">July</option>
						<option value="8">August</option>
						<option value="9">September</option>
						<option value="10">October</option>
						<option value="11">November</option>
						<option value="12">December</option>
					</select>
				</label>

				<text>Year</text>

				<label>
					<select value={this.state.year} onChange={this.handleYearChange}>
						<option value="2021">2021</option>
						<option value="2022">2022</option>
						<option value="2023">2023</option>
						<option value="2024">2024</option>
					</select>
				</label>
				
				<div><text>Attendant emails (To add more sperate by ,)</text>
				<input
					type="text"
						placeholder="Email of attendants"
						value={this.state.email}
					onChange={this.handleEmailChange}
					/></div>
				<input type="submit" value="Make new meeting" />
			</form>
		);
	}
}

function createRemarkable() {
	var remarkable =
		'undefined' != typeof global && global.Remarkable
			? global.Remarkable
			: window.Remarkable;

	return new remarkable();
}

class MeetingList extends React.Component {
	render() {
		var listOfMeetings = this.props.data.map(function (Meetings) {
			return (
				<Meeting room={Meetings.roomName} data={Meetings} key={Meetings.id}>
					
				</Meeting>
			);
		});
		return <div className="MeetingList">{listOfMeetings}</div>;
	}
}

class Meeting extends React.Component {
	render() {
		var Meetings = this.props.data;
		return (
			<div className="meeting">
				<h2 className="meetingRoom">{this.props.room}</h2>
				<p>{Meetings.starttime}</p>
				<p>{Meetings.endtime}</p>
				{Meetings.attendants?.map((value, index) => {
					return <p>{value.email}</p>;
				})}
			</div>
		);
	}
}
