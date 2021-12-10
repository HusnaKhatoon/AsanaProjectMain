import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ControlService } from 'src/app/services/control.service';
import * as moment from 'moment';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    public chartModuleOptions = {};

    chartModule;

    public chartResourceOptions = {};

    chartResource;

    public chartProjectOptions = {};

    chartProject;

    searchProject
    searchTask
    searchSubtask
    searchSubtaskLate

    public modules = []
    public resources = []

    public projects = []

    selectedDate

    public sp: number = 0;

    public selected_resources = []
    public selected_tasks = []
    public selected_subtasks = []
    public selected_subtaskLate = []

    isActive = {}

    constructor(
        private ts: Title,
        private control: ControlService,
        private toastr: ToastrService,
        private ar: ActivatedRoute,
        private router: Router,
    ) {
        this.ts.setTitle("Projects");

    }

    ngOnInit() {

        this.chartModuleOptions = {
            series: [{
                name: 'Story Point',
                data: []
            }],
            chart: {
                height: 350,
                type: 'bar',
                fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "";
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: [],
                position: 'bottom',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "";
                    }
                }

            },
            fill: {
                colors: ["#66DCF1"]
            },
            noData: {
                text: 'Please Select A Project...'
            }
        };

        this.chartResourceOptions = {
            series: [{
                name: 'Story Point',
                data: []
            }],
            chart: {
                height: 350,
                type: 'bar',
                fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "";
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: [],
                position: 'bottom',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "";
                    }
                }

            },
            fill: {
                colors: ["#66DCF1"]
            },
            noData: {
                text: 'Please Select A Project...'
            }
        };

        this.chartProjectOptions = {
            series: [{
                name: 'Total Story Point',
                data: []
            }, {
                name: 'Uncompleted Story Point',
                data: []
            }],
            chart: {
                height: 350,
                type: 'area',
                fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                colors: ["#7CE1F3", "#FBCD6C"]
            },
            colors: ['#7CE1F3', '#FBCD6C'],
            xaxis: {
                categories: []
            },
            noData: {
                text: 'Please Select A Project...'
            },
        };

        this.chartModule = new ApexCharts(document.querySelector("#chart-module"), this.chartModuleOptions);
        this.chartModule.render();

        this.chartResource = new ApexCharts(document.querySelector("#chart-resource"), this.chartResourceOptions);
        this.chartResource.render();


        this.chartProject = new ApexCharts(document.querySelector("#chart-project"), this.chartProjectOptions);
        this.chartProject.render();

        this.control.getAllProjects().subscribe(resp => {
          // console.log(resp);
             if (resp.code == 0) {

                // console.log(resp.result)
                this.projects = resp.result

                resp.result.forEach(rep => {
                    this.isActive = {
                        ...this.isActive,
                        [rep.project_id]: true
                    }
                })

                // console.log(this.isActive)

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

         if (this.router.url.includes("search")) {
            this.ar.paramMap.subscribe((paramMap: ParamMap) => {
                // console.log(paramMap);
                let project_id = paramMap.get('project_id')
                let task_id = paramMap.get('task_id')
                // console.log(project_id);
                // console.log(task_id);
                let project = {
                    project_id: project_id
                }
                let task = {
                    task_id: task_id
                }
                this.showProjectData(project)
                this.showSelectedSubtask(task)
            });
        }
    }

    showProjectData(project) {
        this.selected_tasks = []
        this.selected_resources = []
        this.sp = 0
         console.log(project)

        //resetting module chart
        this.chartModule.updateSeries([{
            data: []
        }])

        //update categories
        this.chartModule.updateOptions({
            xaxis: {
                categories: []
            },
        })

        //resetting resource chart
        this.chartResource.updateSeries([{
            data: []
        }])

        //update categories
        this.chartResource.updateOptions({
            xaxis: {
                categories: []
            },
        })

        //resetting project chart
        this.chartProject.updateSeries([
            {
                //total story point
                data: []
            },
            {
                //completed story point
                data: []
            }
        ])

        //update categories
        this.chartProject.updateOptions({
            xaxis: {
                categories: []
            },
        })

        this.control.projectLineChart(project.project_id).subscribe(resp => {
            if (resp.code == 0) {
                // console.log(resp.result)

                let categories = []
                let data_1 = []
                let data_2 = []

                resp.result.forEach(res => {
                    data_1.push(res.data_total.story_point)
                    data_2.push(res.data_null.story_point)
                    categories.push(res.data_total.category)
                })

                // console.log(categories)
                // console.log(data_1)
                // console.log(data_2)


                //putting values in project chart
                this.chartProject.updateSeries([
                    {
                        //total story point
                        data: data_1
                    },
                    {
                        //completed story point
                        data: data_2
                    }
                ])

                //update categories
                this.chartProject.updateOptions({
                    xaxis: {
                        categories: categories
                    },
                })


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

        this.control.getTasksByProject(project.project_id).subscribe(resp => {
            if (resp.code == 0) {
                let modulesObj = {}
                let resourceObj = {}

                // console.log(resp.result)
                this.selected_tasks = resp.result

                //calculating the project story point and module story_point
                resp.result.forEach(task => {

                    // resource story point
                    if (resourceObj.hasOwnProperty(task.assignee_id)) {
                        let val = +resourceObj[task.assignee_id].story_point
                        val = val + +task.story_point
                        resourceObj[task.assignee_id] = {
                            resource: task.assignee,
                            story_point: +val
                        }
                    } else {
                        resourceObj = {
                            ...resourceObj,
                            [task.assignee_id]: {
                                resource: task.assignee,
                                story_point: +task.story_point
                            },
                        };
                    }


                    //project story_point
                    let sp = +task.story_point
                    this.sp = this.sp + sp

                    //module specific story_point
                    if (modulesObj.hasOwnProperty(task.module)) {
                        let val = +modulesObj[task.module].story_point
                        val = val + +task.story_point
                        modulesObj[task.module] = {
                            module: task.module,
                            story_point: +val
                        }
                    } else {
                        modulesObj = {
                            ...modulesObj,
                            [task.module]: {
                                module: task.module,
                                story_point: +task.story_point
                            },
                        };
                    }
                })
                this.modules = []
                Object.keys(modulesObj).forEach(i => {
                    // console.log(modulesObj[i])

                    let module = "No Module"
                    let story_point = 0

                    if (modulesObj[i].module != null) {
                        module = modulesObj[i].module
                    }

                    if (modulesObj[i].story_point != null) {
                        story_point = modulesObj[i].story_point
                    }


                    this.modules.push({
                        module,
                        story_point
                    })
                });
                // console.log(this.modules)

                this.resources = []
                Object.keys(resourceObj).forEach(i => {
                    // console.log(modulesObj[i])
                    this.resources.push(resourceObj[i])
                });
                // console.log(this.resources)

                //update resources
                let categories_resources = []
                let data_resources = []

                this.resources.forEach(mod => {
                    categories_resources.push(mod.resource)
                    data_resources.push(mod.story_point)
                })

                //update data
                this.chartResource.updateSeries([{
                    data: data_resources
                }])

                //update categories
                this.chartResource.updateOptions({
                    xaxis: {
                        categories: categories_resources
                    },
                })

                //update modules
                let categories_module = []
                let data_module = []

                this.modules.forEach(mod => {
                    categories_module.push(mod.module)
                    data_module.push(mod.story_point)
                })

                categories_module.push("Total")
                data_module.push(this.sp)
                //update data
                this.chartModule.updateSeries([{
                    data: data_module
                }])

                //update categories
                this.chartModule.updateOptions({
                    xaxis: {
                        categories: categories_module
                    },
                })


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

        this.control.getResourcesByProject(project.project_id).subscribe(resp => {
            if (resp.code == 0) {

                // console.log(resp.result)
                this.selected_resources = resp.result

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

    showSelectedSubtask(task) {
        // console.log(task)
        this.selected_subtasks = []
        this.selected_subtaskLate = []

        this.control.getSubtaskByTask(task.task_id).subscribe(resp => {
            if (resp.code == 0) {

                // console.log(resp.result)
                this.selected_subtasks = resp.result

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

    statusSubtask(task) {
        this.selected_subtaskLate = []
        this.selected_subtasks = []
        // console.log(task)

        this.control.getSubtaskByTaskRunningLate(task).subscribe(resp => {
            if (resp.code == 0) {
                // console.log(resp.result)
                this.selected_subtaskLate = resp.result

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

    editPrivilege(id, state) {

        if (this.isActive[id] == true) {
            this.isActive[id] = false
        } else {
            this.isActive[id] = true
        }

        if (state == 'cancel') {
            this.ngOnInit()
        }
    }

    updateProject(val) {
        let data = {
            project_id: val.project_id,
            start_date: moment(val.start_date).format('YYYY-MM-DD'),
            end_date: moment(val.end_date).format('YYYY-MM-DD'),
            due_date: moment(val.due_date).format('YYYY-MM-DD')
        }
        // console.log(data)
        this.control.updateProjectDetails(data).subscribe(res => {
            if (res.code == 0) {
                this.toastr.show(
                    `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                        <span data-notify="message">                
                            `+ res.message + `
                        </span>`,
                    "",
                    {
                        timeOut: 3000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-success alert-with-icon",
                        positionClass: "toast-bottom-right"
                    }
                );
                this.ngOnInit();
            } else {
                this.toastr.show(
                    `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                        <span data-notify="message">                
                            `+ res.message + `
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

    getTheDate(project_id, event) {
        // console.log(project_id, event)
    }

    goToSprints(project) {
        this.router.navigate(["dashboard/projects/sprints/" + project.project_id])
    }
} 
