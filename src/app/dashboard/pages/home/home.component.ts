import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ControlService } from 'src/app/services/control.service';
import { ToastrService } from 'ngx-toastr';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public chartOptions = {};

    chart;

    public chartResourceOptions = {};

    chartResource;

    public projects;
    public resources;
    public tasks;
    public subtasks;

    user_resources //user resource

    name;

    selected: { startDate: Moment, endDate: Moment };

    constructor(private ts: Title, private control: ControlService, private toastr: ToastrService,) {
        this.ts.setTitle("Home");
        this.chartOptions = {
            series: [],
            chart: {
                height: 350,
                type: "heatmap",
                fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 4 / 10,
                    colorScale: {
                        ranges: [
                            {
                                from: 0,
                                to: 80,
                                name: "Low",
                                color: "#71CB71"
                            },
                            {
                                from: 80,
                                to: 100,
                                name: "Normal",
                                color: "#008FFB"
                            },
                            {
                                from: 100,
                                to: 999999999999,
                                name: "High",
                                color: "#FF3D3D"
                            },
                        ]
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: true,
                    formatter: function (val) {
                        return val + "%";
                    }
                }

            },
            noData: {
                text: 'Loading...'
            }
        };

        this.chartResourceOptions = {
            series: [],
            chart: {
                height: 350,
                type: "heatmap",
                fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 4 / 10,
                    colorScale: {
                        ranges: [
                            {
                                from: 0,
                                to: 80,
                                name: "Low",
                                color: "#71CB71"
                            },
                            {
                                from: 80,
                                to: 100,
                                name: "Normal",
                                color: "#008FFB"
                            },
                            {
                                from: 100,
                                to: 999999999999,
                                name: "High",
                                color: "#FF3D3D"
                            },
                        ]
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: true,
                    formatter: function (val) {
                        return val + "%";
                    }
                }

            },
            noData: {
                text: 'Please Select A Resource...'
            }
        };

        //adding last 4 weeks to the date picker as default
        const start_date = moment().startOf('day').add(-4, 'w');
        const end_date = moment().startOf('day');
        this.selected = { startDate: start_date, endDate: end_date }
    }

    changeDate(e) {
        if (this.selected.startDate !== null && this.selected.endDate !== null) {
            // console.log(this.selected)

            // date string
            let start = this.selected.startDate
            let end = this.selected.endDate.startOf('day')

            // console.log(start)
            // console.log(end)

            // number of weeks present in the selected date range
            let diff = moment.duration(end.diff(start)).asDays() / 7

            // two selected date range from the datepicker
            let startLoop = +this.selected.startDate.format('x')

            // console.log(startLoop)
            // console.log(endLoop)

            let week = 0
            let i = startLoop;

            let data = []

            while (week < diff) {
                week += 1
                // console.log(week)

                data.push({
                    start_date: moment(new Date(i)).format("YYYY-MM-DD"),
                    end_date: moment(new Date(i)).add(1, 'w').format("YYYY-MM-DD")
                })
                // console.log(moment(new Date(i)).format("YYYY-MM-DD"))
                // console.log(moment(new Date(i)).add(1, 'w').format("YYYY-MM-DD"))

                //7 days timestamp range
                i = i + 604800000
            }

            // console.log(data)

            this.control.chartHeatmapData(data).subscribe(resp => {
                if (resp.code == 0) {
                    // console.log(resp.result)
                    this.chart.updateSeries(resp.result)
                } else {
                    this.toastr.show(
                        `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                        <span data-notify="message">                
                            `+ resp.message + `
                        </span>`,
                        "",
                        {
                            timeOut: 3000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-danger alert-with-icon",
                            positionClass: "toast-bottom-right"
                        }
                    );
                }
            }, (error) => {
                if (error.status == 401) {
                    this.control.logout()
                }
            });



        }
    }



    ngOnInit() {

        this.control.getAllResources().subscribe(resp => {
            if (resp.code == 0) {

                //  console.log(resp.result)

                // this.showResources(resp.result[0])

                this.user_resources = resp.result

            } else {
                this.toastr.show(
                    `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                    <span data-notify="message">                
                        `+ resp.message + `
                    </span>`,
                    "",
                    {
                        timeOut: 3000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-danger alert-with-icon",
                        positionClass: "toast-bottom-right"
                    }
                );
            }
        }, (error) => {
            if (error.status == 401) {
                this.control.logout()
            }
        });


        this.control.getCount().subscribe(resp => {
            if (resp.code == 0) {
                this.projects = resp.result.projects
                this.resources = resp.result.resources
                this.tasks = resp.result.tasks
                this.subtasks = resp.result.subtasks
            } else {
                this.toastr.show(
                    `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                    <span data-notify="message">                
                        `+ resp.message + `
                    </span>`,
                    "",
                    {
                        timeOut: 3000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-danger alert-with-icon",
                        positionClass: "toast-bottom-right"
                    }
                );
            }
        }, (error) => {
            if (error.status == 401) {
                this.control.logout()
            }
        });
         console.log(this.chartOptions)
        // heatmap chart
        this.chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);
        this.chart.render();

        this.chartResource = new ApexCharts(document.querySelector("#chart-resource"), this.chartResourceOptions);
        this.chartResource.render();
    }

    statusResources(id, name) {
        // console.log(id)

        //resetting resource chart
        this.chartResource.updateSeries([])

        this.chartResource.updateOptions({
            noData: {
                text: 'Loading...'
            }
        })

        this.name = name

        this.control.resourceWiseChart(id).subscribe(resp => {
            if (resp.code == 0) {

                if (resp.result.length == 0) {

                    this.toastr.show(
                        `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                        <span data-notify="message">                
                            No Records Found for the selected Resource
                        </span>`,
                        "",
                        {
                            timeOut: 3000,
                            closeButton: true,
                            enableHtml: true,
                            toastClass: "alert alert-info alert-with-icon",
                            positionClass: "toast-bottom-right"
                        }
                    );

                } else {
                    // console.log(resp.result)

                    this.chartResource.updateSeries(resp.result)

                }
            } else {
                this.toastr.show(
                    `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                    <span data-notify="message">                
                        `+ resp.message + `
                    </span>`,
                    "",
                    {
                        timeOut: 3000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-danger alert-with-icon",
                        positionClass: "toast-bottom-right"
                    }
                );
            }
        }, (error) => {
            if (error.status == 401) {
                this.control.logout()
            }
        });
    }


}
