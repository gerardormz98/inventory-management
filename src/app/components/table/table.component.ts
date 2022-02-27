import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject, Subscription } from 'rxjs';
import { TableRefreshService } from 'src/app/services/table-refresh/table-refresh.service';
import { Strings } from 'src/app/utils/strings';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() tableType: string = '';
	@ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
	dataChangedSub: Subscription;

	dtOptions: DataTables.Settings = {
		language: Strings.datatableLabels,
	};

	dtTrigger: Subject<any> = new Subject<any>();

	constructor(private tableService: TableRefreshService) {}

	ngOnInit(): void {
		this.dataChangedSub = this.tableService.dataChanged.subscribe((tableType) => {
			if (this.tableType === tableType) {
				this.rerender();
			}
		});
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next(null);
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
		this.dataChangedSub.unsubscribe();
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.dtTrigger.next(null);
		});
	}
}
