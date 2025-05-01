package hooks

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func RegisterHooks(app *pocketbase.PocketBase) {
	app.OnRecordAfterCreateSuccess("flag_environment_configs").BindFunc(func(e *core.RecordEvent) error {
		updateIsEnabledAnywhere(app, e.Record.GetString("feature_flag"))
		return e.Next()
	})

	app.OnRecordAfterUpdateSuccess("flag_environment_configs").BindFunc(func(e *core.RecordEvent) error {
		updateIsEnabledAnywhere(app, e.Record.GetString("feature_flag"))
		return e.Next()
	})

	app.OnRecordAfterDeleteSuccess("flag_environment_configs").BindFunc(func(e *core.RecordEvent) error {
		updateIsEnabledAnywhere(app, e.Record.GetString("feature_flag"))
		return e.Next()
	})
}
