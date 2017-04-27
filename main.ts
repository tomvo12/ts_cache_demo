/// <reference path="typings/index.d.ts" />

import * as $ from "jquery";
import { Cache } from "cache";

export class app {

    public static initialize(): void {
        Cache.memoize(() => app.ajax("http://services.odata.org/V4/Northwind/Northwind.svc"), null, 1000)
            .then(data => {
                console.log(data);
            })
    }

    static ajax(options: JQueryAjaxSettings): Promise<any> {
        return new Promise((resolve, reject) => {
            $.ajax(options).done(resolve).fail(reject);
        });
    }
}

app.initialize();
